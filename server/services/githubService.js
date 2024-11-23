const axios = require("axios");

const fetchPRsFromGithub = async (repoOwner, repoName, accessToken) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching PRs from GitHub:", error.message);
    throw error;
  }
};

module.exports = { fetchPRsFromGithub };
