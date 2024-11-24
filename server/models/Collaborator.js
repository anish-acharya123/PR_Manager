const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  repoOwner: { type: Number, requied: true },
  repoId: { type: Number, requied: true },
  username: { type: String, required: true },
  githubLink: { type: String, required: true },
  email: { type: String },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

const Collaborator = mongoose.model("Collaborator", collaboratorSchema);

module.exports = Collaborator;
