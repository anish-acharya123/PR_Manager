const express = require("express");
const router = express.Router();
const {
  InsertPullRequest,
  FetchPullRequestFromMD,
} = require("../controllers/pullrequestController");

router.post("/repos/:owner/:repo/pull-requests", InsertPullRequest);

router.get("/repos/:repoId/pull-requests", FetchPullRequestFromMD);

module.exports = router;
