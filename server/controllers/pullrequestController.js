const PullRequest = require("../models/PullrequestModel");
const { trace } = require("../routes/authRoutes");
const { fetchPRsFromGithub } = require("../services/githubService");

const InsertPullRequest = async (req, res) => {
  const { owner, repo } = req.params;
  const { token, repoId } = req.body;
  try {
    const pullRequests = await fetchPRsFromGithub(owner, repo, token);

    for (const pr of pullRequests) {
      const existingPR = await PullRequest.findOne({ prId: pr.id });

      if (!existingPR) {
        // console.log(pr, "//next");
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
            reviewers: [],
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at),
          });

          await newPR.save();
        } catch (error) {
          res.status(500).json({ error: "Faild to store in mb" });
        }
      }
    }
    res.status(200).json({ message: "Pull requests saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch and save PRs" });
  }
};

const FetchPullRequestFromMD = async (req, res) => {
  const { repoId } = req.params;
  console.log(repoId);

  try {
    const pullRequests = await PullRequest.find({ repoId });
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PRs from MongoDB" });
  }
};

module.exports = { InsertPullRequest, FetchPullRequestFromMD };
