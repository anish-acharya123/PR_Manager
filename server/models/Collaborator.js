const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  repoOwner: { type: String, requied: true },
  repoId: { type: Number, requied: true },
  inviteeName: { type: String, required: true },
  inviteeGithub: { type: String, required: true },
  inviteeAvatar: {type: String, required: true},
  email: { type: String },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

const Collaborator = mongoose.model("Collaborator", collaboratorSchema);

module.exports = Collaborator;
