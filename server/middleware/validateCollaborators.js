const Collaborator = require("../models/Collaborator");

const validateCollaborators = async (req, res, next) => {
  try {
    const { repoOwner, repoId } = req.body;

    if (!repoOwner || !repoId) {
      return res
        .status(400)
        .json({ message: "Repo Owner and Repo ID are required." });
    }

    // Fetch all collaborators for the given repo
    const collaborators = await Collaborator.find({ repoOwner, repoId });

    console.log(collaborators);
    if (collaborators.length === 0) {
      return res
        .status(404)
        .json({ message: "No collaborators found for this repository." });
    }

    // Check if all collaborators have email addresses
    const missingEmail = collaborators.find(
      (collaborator) => !collaborator.email
    );
    if (missingEmail) {
      return res.status(400).json({
        message: `Collaborator ${missingEmail.inviteeName} is missing an email address. Please update the email before assigning reviewers.`,
      });
    }

    // Check if all collaborators have status "accepted"
    const pendingCollaborator = collaborators.find(
      (collaborator) => collaborator.status === "pending"
    );
    console.log(pendingCollaborator);
    if (pendingCollaborator) {
      return res.status(400).json({
        message: `Collaborator ${pendingCollaborator.inviteeName} has a "pending" status. Please accept the collaborator before assigning reviewers.`,
      });
    }

    // If all validations pass, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in validateCollaborators middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateCollaborators;
