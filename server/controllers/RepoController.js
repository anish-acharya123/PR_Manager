const axios = require("axios");
const Repository = require("../models/RepositoryModel");
require("dotenv").config();

const fetchAndStoreRepos = async (req, res) => {
  const { token } = req.body; // GitHub token from request body
  const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Missing GitHub token." });
  }

  try {
    // Step 1: Check lastFetchedAt for any repository
    const lastFetchedRepo = await Repository.findOne().sort({
      lastFetchedAt: -1,
    });

    const now = new Date();
    const lastFetchedTime = lastFetchedRepo?.lastFetchedAt || 0;

    if (lastFetchedRepo && now - lastFetchedTime < TEN_MINUTES) {
      console.log("Serving data from MongoDB. No GitHub API call required.");
      const repositories = await Repository.find();
      return res.status(200).json(repositories);
    }

    let repositories = [];
    let page = 1;
    let hasNextPage = true;

    // Step 2: Fetch repositories from GitHub
    while (hasNextPage) {
      console.log("next");
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          per_page: 30,
          page: page,
        },
      });

      repositories = [...repositories, ...response.data];

      const linkHeader = response.headers["link"];
      if (linkHeader && linkHeader.includes('rel="next"')) {
        page++;
      } else {
        hasNextPage = false;
      }
    }

    // Step 3: Store repositories in MongoDB
    const nowTimestamp = new Date();
    const repoPromises = repositories.map(async (repo) => {
      const existingRepo = await Repository.findOne({ repoId: repo.id });

      if (!existingRepo) {
        const newRepo = new Repository({
          repoId: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          visibility: repo.private ? "private" : "public",
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          collaborators: [],
          lastFetchedAt: nowTimestamp, // Set the fetch time
        });

        return await newRepo.save();
      } else {
        // Update visibility, updatedAt, and lastFetchedAt
        existingRepo.visibility = repo.private ? "private" : "public";
        existingRepo.updatedAt = repo.updated_at;
        existingRepo.lastFetchedAt = nowTimestamp;
        return await existingRepo.save();
      }
    });

    await Promise.all(repoPromises);

    // Fetch updated repositories from MongoDB
    const updatedRepositories = await Repository.find();

    res.status(200).json(updatedRepositories);
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({ error: "Failed to fetch and store repositories." });
  }
};

module.exports = { fetchAndStoreRepos };
