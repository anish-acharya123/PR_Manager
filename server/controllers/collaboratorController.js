const axios = require("axios");
const Collaborator = require("../models/Collaborator");
const Repository = require("../models/RepositoryModel");

const NewCollaborator = async (req, res) => {
  const { repoOwner, repoName, collaboratorUsername, token } = req.body;

  try {
    // Invite collaborator via GitHub API
    const response = await axios.put(
      `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${collaboratorUsername}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    // Extract invitee details
    const githubUrl = response.data.invitee.html_url;
    const inviteeName = response.data.invitee.login;
    const avatarUrl = response.data.invitee.avatar_url;

    // Fetch repository to ensure it exists in the database
    const repository = await Repository.findOne({
      name: repoName,
      owner: repoOwner,
    });

    if (!repository) {
      return res
        .status(404)
        .json({ error: "Repository not found in the database." });
    }

    // Check if the collaborator already exists in the repository
    const existingCollaborator = repository.collaborators.find(
      (collab) => collab.collaborator.toString() === githubUrl
    );

    if (existingCollaborator) {
      return res.status(200).json({
        message: "Collaborator already exists.",
        collaborator: existingCollaborator,
      });
    }

    // Create new collaborator in Collaborator schema
    const newCollaborator = new Collaborator({
      name: inviteeName,
      githubUrl,
      avatarUrl,
    });
    await newCollaborator.save();

    // Add collaborator to the repository's collaborators array with "pending" status
    repository.collaborators.push({
      collaborator: newCollaborator._id,
      status: "pending",
    });
    await repository.save();

    res.status(201).json({
      message: "Collaboration invitation sent.",
      collaborator: newCollaborator,
    });
  } catch (error) {
    console.error("Error in NewCollaborator:", error);
    res.status(500).json({
      error: error.response?.data || error.message || "Unknown error occurred",
    });
  }
};

const GetAndStoreCollaborators = async (req, res) => {
  const { repoOwner, repoName, repoId } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!repoOwner || !repoName || !token || !repoId) {
    return res.status(400).json({
      error: "Missing required parameters: repoOwner, repoName, token, repoId",
    });
  }

  try {
    // Find the repository
    let repository = await Repository.findOne({ repoId }).populate({
      path: "collaborators.collaborator",
      select: "name githubUrl avatarUrl email",
    });

    if (!repository) {
      return res.status(404).json({ error: "Repository not found." });
    }

    // Fetch collaborators from GitHub API
    const githubCollaborators = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const pendingInvitations = await getRepositoryInvitations(
      repoOwner,
      repoName,
      token
    );

    const collaboratorsMap = new Map(
      repository.collaborators.map((collab) => [
        collab.collaborator._id.toString(),
        collab,
      ])
    );

    // Process collaborators
    for (const collaborator of githubCollaborators.data) {
      const { login, html_url, avatar_url } = collaborator;
      const hasPendingInvitation = pendingInvitations.some(
        (inv) => inv.login === login
      );

      let existingCollaborator = await Collaborator.findOne({
        githubUrl: html_url,
      });

      if (!existingCollaborator) {
        existingCollaborator = new Collaborator({
          name: login,
          githubUrl: html_url,
          avatarUrl: avatar_url,
        });
        await existingCollaborator.save();
      }

      const existingRepoCollaborator = collaboratorsMap.get(
        existingCollaborator._id.toString()
      );

      if (existingRepoCollaborator) {
        existingRepoCollaborator.status = hasPendingInvitation
          ? "pending"
          : "accepted";
      } else {
        repository.collaborators.push({
          collaborator: existingCollaborator._id,
          status: hasPendingInvitation ? "pending" : "accepted",
        });
      }
    }

    // Save the updated repository
    await repository.save();

    // Fetch updated repository with populated collaborators
    repository = await Repository.findOne({ repoId }).populate({
      path: "collaborators.collaborator",
      select: "name githubUrl avatarUrl email",
    });

    res.status(200).json({
      message: "Collaborators processed successfully.",
      collaborators: repository.collaborators,
    });
  } catch (error) {
    console.error("Error in GetAndStoreCollaborators:", error);
    res.status(500).json({
      error: error.response?.data || error.message || "Unknown error occurred",
    });
  }
};

const getRepositoryInvitations = async (repoOwner, repoName, token) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/invitations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return response.data.map((inv) => ({
      login: inv.invitee.login,
      html_url: inv.invitee.html_url,
    }));
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};

///////////// trying to store email of that collaborator with id  but this code is wrong .....
const updateCollaboratorEmail = async (req, res) => {
  const { collaboratorId, email } = req.body;

  if (!collaboratorId || !email) {
    return res
      .status(400)
      .json({ message: "Collaborator ID and email are required." });
  }

  try {
    // Find collaborator by ID and update the email field
    const collaborator = await Collaborator.findByIdAndUpdate(
      collaboratorId,
      { email },
      { new: true } // Return the updated document
    );

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found." });
    }

    res.status(200).json({
      message: "Email updated successfully.",
      collaborator,
    });
  } catch (error) {
    console.error("Error updating collaborator email:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  NewCollaborator,
  updateCollaboratorEmail,
  GetAndStoreCollaborators,
};
