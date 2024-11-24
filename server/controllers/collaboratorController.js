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
    console.log("GitHub Response:", response.data);

    const collaborator = new Collaborator({
      repoOwner: response.data.owner.id,
      repoId: response.data.repository.id,
      username: response.data.invitee.login,
      githubLink: response.data.invitee.html_url,
      status: "pending",
    });

    await collaborator.save();

    res.status(201).json({
      message: "Collaboration invitation sent",
      collaborator,
    });
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message || "Unknown error occurred",
    });
  }
};

module.exports = { NewCollaborator };
