const mongoose = require("mongoose");

const pullRequestSchema = new mongoose.Schema({
  repoId: {
    type: String,
    ref: "Repository",
    required: true,
  }, // Reference to Repository
  prId: { type: String, required: true, unique: true }, // GitHub Pull Request ID
  title: { type: String, required: true }, // PR title
  authorName: { type: String, required: true }, // PR author's username
  authorGithubUrl: { type: String, required: true }, // PR author's GitHub profile
  prLink: { type: String, required: true, unique: true }, // GitHub PR URL
  status: { type: String, enum: ["open", "closed", "merged"], default: "open" }, // PR status
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Collaborator" }, // Reference to Collaborator as a single reviewer
  createdAt: { type: Date, required: true }, // PR creation date
  updatedAt: { type: Date, required: true }, // PR update date
});

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);
module.exports = PullRequest;
