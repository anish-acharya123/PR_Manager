const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // GitHub username or name
  githubUrl: { type: String, required: true, unique: true }, // GitHub profile URL
  email: { type: String }, // Optional email
  avatarUrl: { type: String }, // GitHub avatar URL
});

const Collaborator = mongoose.model("Collaborator", collaboratorSchema);
module.exports = Collaborator;
