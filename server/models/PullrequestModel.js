const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  reviewerGithub: { type: String, required: true },
  email: { type: String }, // Optional field
});

const pullRequestSchema = new mongoose.Schema({
  repoId: { type: String, required: true },
  repoName: { type: String, required: true },
  prId: { type: String, required: true, unique: true },
  prLink: { type: String, required: true, unique: true },
  title: { type: String, required: true }, // Title of the pull request
  authorId: { type: String, required: true }, // Author's GitHub ID
  authorLink: { type: String, required: true },
  authorName: { type: String, required: true }, // Author's GitHub username
  status: {
    type: String,
    enum: ["open", "closed", "merged"],
    default: "open",
  }, // Status of the PR
  reviewers: {
    type: reviewerSchema, // Single object for reviewers' data
    default: {
      reviewerName: "",
      reviewerGithub: "",
      email: "",
    },
    required: false, // Optional if you want to insert PRs without reviewers initially
  },
  createdAt: { type: Date, required: true }, // PR creation date
  updatedAt: { type: Date, required: true }, // Last update date
});

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);

module.exports = PullRequest;
