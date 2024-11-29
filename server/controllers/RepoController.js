const axios = require("axios");
const Repository = require("../models/RepositoryModel");
require("dotenv").config();

const fetchAndStoreRepos = async (req, res) => {
  const { token } = req.body; // Assuming OAuth token is stored in req.user after login
  //   console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Missing GitHub token." });
  }

  try {
    let repositories = [];
    let page = 1;
    let hasNextPage = true;

    // Fetch repositories from GitHub until there are no more pages
    while (hasNextPage) {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          per_page: 30, // Maximum number of repositories per page
          page: page, // Start at the first page
        },
      });

      // Concatenate the fetched repositories
      repositories = [...repositories, ...response.data];

      // Check if there is a next page
      const linkHeader = response.headers["link"];
      if (linkHeader && linkHeader.includes('rel="next"')) {
        page++; // Move to the next page
      } else {
        hasNextPage = false; // No more pages
      }
    }

    console.log(repositories.length);
    // Step 2: Store repositories in MongoDB
    const repoPromises = repositories.map(async (repo) => {
      const existingRepo = await Repository.findOne({ repoId: repo.id });

      if (!existingRepo) {
        // New repository
        const newRepo = new Repository({
          repoId: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          visibility: repo.private ? "private" : "public",
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          collaborators: [], // Initially empty
        });

        return await newRepo.save();
      } else {
        // Existing repository, update fields if necessary
        existingRepo.visibility = repo.private ? "private" : "public";
        existingRepo.updatedAt = repo.updated_at;
        return await existingRepo.save();
      }
    });

    await Promise.all(repoPromises); // Wait for all saves to complete

    res.status(200).json({
      message: "Repositories fetched and stored successfully.",
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({ error: "Failed to fetch and store repositories." });
  }
};

module.exports = { fetchAndStoreRepos };
