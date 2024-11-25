const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  reviwerName: { type: String, required: true },
  reviwerGithub: { type: String, required: true },
  email: { type: String },
});

const pullRequestSchema = new mongoose.Schema({
  repoId: { type: String, required: true },
  repoName: { type: String, required: true },
  prId: { type: String, required: true, unique: true },
  prLink: { type: String, required: true, unique: true },
  title: { type: String, required: true }, // Title of the pull request
  authorId: { type: String, required: true }, // Author's GitHub ID
  authorLink: { type: String, requied: true },
  authorName: { type: String, required: true }, // Author's GitHub username
  status: { type: String, enum: ["open", "closed", "merged"], default: "open" }, // Status of the PR
  reviewers: [reviewerSchema], // Array of reviewers
  createdAt: { type: Date, required: true }, // PR creation date
  updatedAt: { type: Date, required: true }, // Last update date
});

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);

module.exports = PullRequest;
