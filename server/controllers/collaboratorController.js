const axios = require("axios");
const Collaborator = require("../models/Collaborator");

const NewCollaborator = async (req, res) => {
  const { repoOwner, repoName, collaboratorUsername, token } = req.body;

  try {
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

    const { id: repoId } = response.data.repository;
    const githubLink = response.data.invitee.html_url;

    const existingCollaborator = await Collaborator.findOne({
      repoId,
      inviteeGithub: githubLink,
    });

    if (existingCollaborator) {
      return res.status(201).json({
        message: "Collaborator already exists.",
        collaborator: existingCollaborator,
      });
    }

    const collaborator = new Collaborator({
      repoOwner: repoOwner,
      repoId,
      inviteeName: response.data.invitee.login,
      inviteeGithub: githubLink,
      inviteeAvatar: response.data.invitee.avatar_url,
      status: "pending",
    });

    await collaborator.save();

    res.status(201).json({
      message: "Collaboration invitation sent",
      collaborator,
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
      error: "Missing required parameters: repoOwner, repoName, token",
    });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const collaborators = response.data;

    const pendingInvitations = await getRepositoryInvitations(
      repoOwner,
      repoName,
      token
    );

    for (const collaborator of collaborators) {
      const { login, html_url, email, avatar_url } = collaborator;
      const hasPendingInvitation = pendingInvitations.some(
        (inv) => inv.login === login
      );

      let existingCollaborator = await Collaborator.findOne({
        repoId: repoId,
        inviteeGithub: html_url,
      });

      if (existingCollaborator) {
        // Update status if it's pending
        existingCollaborator.status = hasPendingInvitation
          ? "pending"
          : "accepted";
        await existingCollaborator.save();
      } else {
        // Create new collaborator entry
        const newCollaborator = new Collaborator({
          repoOwner,
          repoId,
          inviteeName: login,
          inviteeGithub: html_url,
          inviteeAvatar: avatar_url,
          email: email || "",
          status: hasPendingInvitation ? "pending" : "accepted",
        });
        await newCollaborator.save();
      }
    }

    const allCollaborators = await Collaborator.find({
      repoId: repoId,
    }).select("-__v");

    res.status(200).json({
      message: "Collaborators processed successfully",
      collaborators: allCollaborators,
    });
  } catch (error) {
    // console.error("Error fetching collaborators:");

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

    const pendingInvitations = response.data.map((inv) => ({
      login: inv.invitee.login,
      html_url: inv.invitee.html_url,
    }));
    return pendingInvitations;
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};





///////////// under construction
const insertEmail = async (req, res) => {
  const { email, inviteeName } = req.body;
  console.log(email, _id);

  const CollaboratorWithInviteeName = await Collaborator.findOneAndUpdate({
    inviteeName
  }); 
  res.status(200).json({
    message: "success",
  });
};

module.exports = { NewCollaborator, GetAndStoreCollaborators, insertEmail };
