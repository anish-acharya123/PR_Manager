const Collaborator = require("../models/Collaborator");
const PullRequest = require("../models/PullrequestModel");
const { fetchPRsFromGithub } = require("../services/githubService");
const nodemailer = require("nodemailer");
require("dotenv").config();

const InsertPullRequest = async (req, res) => {
  const { owner, repo } = req.params;
  const { token, repoId } = req.body;

  if (!owner || !repo || !token || !repoId) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const errors = []; // Collect errors here

  try {
    const pullRequests = await fetchPRsFromGithub(owner, repo, token);

    for (const pr of pullRequests) {
      const existingPR = await PullRequest.findOne({ prId: pr.id });

      // console.log(pr);
      if (!existingPR) {
        try {
          const newPR = new PullRequest({
            repoId,
            repoName: pr.base.repo.name,
            prId: pr.id,
            prLink: pr._links.html.href,
            title: pr.title,
            authorId: pr.user.id,
            authorLink: pr.user.html_url,
            authorName: pr.user.login,
            status: pr.state === "closed" ? "closed" : "open",
            reviewers: null,
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at),
          });

          await newPR.save();
        } catch (error) {
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
  // console.log(repoId);

  try {
    const pullRequests = await PullRequest.find({ repoId });
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PRs from MongoDB" });
  }
};

//////// assign random reviwer to the repo
const assignRandomReviewer = async (req, res) => {
  try {
    const { repoOwner, repoId } = req.body;

    // Step 1: Fetch collaborators for the repo
    const collaborators = await Collaborator.find({
      repoOwner,
      repoId,
      status: "accepted", // Only accepted collaborators
    });

    if (collaborators.length === 0) {
      return res
        .status(404)
        .json({ message: "No collaborators found for this repo" });
    }

    // Step 2: Fetch all pull requests for the repo
    const pullRequests = await PullRequest.find({ repoId });

    if (pullRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "No pull requests found for this repo" });
    }

    // Step 3: Iterate over each pull request and assign a random collaborator
    for (const pr of pullRequests) {
      const randomCollaborator =
        collaborators[Math.floor(Math.random() * collaborators.length)];

      console.log(pr.repoId);
      pr.reviewers.reviewerGithub = randomCollaborator.inviteeGithub;
      pr.reviewers.reviewerName = randomCollaborator.inviteeName;
      pr.reviewers.email = randomCollaborator.email;

      await pr.save(); // Save the updated pull request

      // Step 4: Send an email to the assigned collaborator
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NAME, // Replace with your email
          pass: process.env.EMAIL_PASSWORD, // Replace with your email password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: randomCollaborator.email,
        subject: "Assigned as Pull Request Reviewer",
        text: `Hi ${randomCollaborator.inviteeName},\n\nYou have been assigned as a reviewer for the pull request titled "${pr.title}". Please review it at the following link: ${pr.prLink}\n\nThank you!`,
      };

      await transporter.sendMail(mailOptions);
    }

    // Step 5: Send response to frontend
    res.status(200).json({
      message:
        "Collaborators assigned successfully to all pull requests and emails sent.",
    });
  } catch (error) {
    console.error("Error assigning reviewers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  InsertPullRequest,
  FetchPullRequestFromMD,
  assignRandomReviewer,
};
