const PullRequest = require("../models/PullrequestModel");
const nodemailer = require("nodemailer");
const Collaborator = require("../models/Collaborator");
const { fetchPRsFromGithub } = require("../services/githubService");
const Repository = require("../models/RepositoryModel");

const InsertPullRequest = async (req, res) => {
  const { owner, repo } = req.params;
  const { token, repoId } = req.body;

  if (!owner || !repo || !token || !repoId) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const errors = [];

  try {
    // Fetch pull requests from GitHub
    const pullRequests = await fetchPRsFromGithub(owner, repo, token);

    for (const pr of pullRequests) {
      // Check if the pull request already exists in the database
      const existingPR = await PullRequest.findOne({ prId: pr.id });

      // console.log(pr);
      if (!existingPR) {
        try {
          const newPR = new PullRequest({
            repoId,
            prId: pr.id,
            title: pr.title,
            prLink: pr._links.html.href,
            authorName: pr.user.login,
            authorGithubUrl: pr.user.html_url,
            status: pr.state === "closed" ? "closed" : "open",
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at),
          });

          await newPR.save();
        } catch (error) {
          console.log(error);
          errors.push({ prId: pr.id, error: error.message });
        }
      }
    }

    if (errors.length > 0) {
      return res.status(200).json({
        message: "Pull requests processed with some errors.",
        errors,
      });
    }

    res.status(200).json({ message: "Pull requests saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch and save PRs" });
  }
};

const FetchPullRequestFromMD = async (req, res) => {
  const { repoId } = req.params;

  try {
    // Fetch all pull requests for the given repository ID
    const pullRequests = await PullRequest.find({ repoId })
      .populate("reviewer")
      .select("-__v");
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PRs from MongoDB" });
  }
};

//////// assign random reviwer to the repo

const assignRandomReviewer = async (req, res) => {
  try {
    const { repoOwner, repoId } = req.body;

    const repository = await Repository.findOne({
      repoId,
      owner: repoOwner,
    }).populate("collaborators.collaborator");

    if (!repository || repository.collaborators.length === 0) {
      return res
        .status(404)
        .json({ message: "No collaborators found for this repository." });
    }

    const acceptedCollaborators = repository.collaborators.filter(
      (collab) => collab.status === "accepted"
    );

    if (acceptedCollaborators.length === 0) {
      return res.status(404).json({
        message: "No accepted collaborators found for this repository.",
      });
    }

    const pullRequests = await PullRequest.find({ repoId, status: "open" });

    if (pullRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "No open pull requests found for this repository." });
    }

    for (const pr of pullRequests) {
      // Check if a reviewer is already assigned
      if (pr.reviewer) {
        continue;
      }

      const validReviewers = acceptedCollaborators.filter(
        (collab) => collab.collaborator.name !== pr.authorName
      );

      if (validReviewers.length === 0) {
        console.warn(
          `No valid reviewers available for pull request: ${pr.title}`
        );
        continue;
      }

      const randomReviewer =
        validReviewers[Math.floor(Math.random() * validReviewers.length)]
          .collaborator;

      pr.reviewer = randomReviewer._id;
      await pr.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: randomReviewer.email,
        subject: "Assigned as Pull Request Reviewer",
        text: `Hi ${randomReviewer.name},\n\nYou have been assigned as a reviewer for the pull request titled "${pr.title}". Please review it at the following link: ${pr.prLink}.\n\nThank you!`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({
      message:
        "Reviewers assigned to all open pull requests successfully, and emails sent.",
    });
  } catch (error) {
    console.error("Error assigning reviewers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const RemoveReviewers = async (req, res) => {
  try {
    const { repoOwner, repoId } = req.body;

    if (!repoOwner || !repoId) {
      return res
        .status(400)
        .json({ message: "Both repoOwner and repoId are required." });
    }

    const updatedPullRequests = await PullRequest.updateMany(
      { repoId },
      { $unset: { reviewer: "" } }
    );

    if (updatedPullRequests.modifiedCount === 0) {
      return res.status(404).json({
        message:
          "No pull requests with reviewers found for the given repository.",
      });
    }

    res.status(200).json({
      message: "All reviewers removed successfully.",
      updatedCount: updatedPullRequests.modifiedCount,
    });
  } catch (error) {
    console.error("Error removing reviewers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  InsertPullRequest,
  FetchPullRequestFromMD,
  assignRandomReviewer,
  RemoveReviewers,
};
