const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema({
  repoId: { type: String, required: true, unique: true }, // GitHub Repository ID
  name: { type: String, required: true }, // Repository name
  owner: { type: String, required: true }, // Repository owner (GitHub username)
  visibility: { type: String, enum: ["public", "private"], required: true }, // Repository visibility
  createdAt: { type: Date, required: true }, // Repository creation date
  updatedAt: { type: Date, required: true }, // Repository last updated date
  lastFetchedAt: { type: Date, default: null },
  collaborators: [
    {
      collaborator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborator",
        unique: true,
      }, // Reference to a collaborator
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      }, // Status per repository
    },
  ],
});

const Repository = mongoose.model("Repository", repositorySchema);

module.exports = Repository;
