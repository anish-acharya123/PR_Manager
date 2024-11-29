const express = require("express");
const { fetchAndStoreRepos } = require("../controllers/RepoController");

const router = express.Router();

// Route to fetch and store repositories
router.post("/fetch-and-store", fetchAndStoreRepos);

module.exports = router;
