const Repository = require("../models/RepositoryModel");
// const Collaborator = require("../models/Collaborator");

const validateCollaborators = async (req, res, next) => {
  try {
    const { repoOwner, repoId } = req.body;

    if (!repoOwner || !repoId) {
      return res
        .status(400)
        .json({ message: "Repo Owner and Repo ID are required." });
    }

    // Fetch the repository and populate collaborators
    const repository = await Repository.findOne({
      repoId,
      owner: repoOwner,
    }).populate("collaborators.collaborator");

    if (!repository) {
      return res
        .status(404)
        .json({ message: "Repository not found with the given owner and ID." });
    }

    const { collaborators } = repository;

    if (!collaborators || collaborators.length === 0) {
      return res
        .status(404)
        .json({ message: "No collaborators found for this repository." });
    }

    // Check if all collaborators have email addresses
    const missingEmail = collaborators.find(
      (collab) => !collab.collaborator.email
    );
    if (missingEmail) {
      return res.status(400).json({
        message: `Collaborator ${missingEmail.collaborator.name} is missing an email address. Please update the email before assigning reviewers.`,
      });
    }

    // Check if all collaborators have status "accepted"
    const pendingCollaborator = collaborators.find(
      (collab) => collab.status === "pending"
    );
    if (pendingCollaborator) {
      return res.status(400).json({
        message: `Collaborator ${pendingCollaborator.collaborator.name} has a "pending" status. Please accept the collaborator before assigning reviewers.`,
      });
    }

    // Validation passed; proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in validateCollaborators middleware:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = validateCollaborators;
