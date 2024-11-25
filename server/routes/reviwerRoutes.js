const express = require("express");
const router = express.Router();
const {
  assignRandomReviewer,
} = require("../controllers/pullrequestController");
const validateCollaborators = require("../middleware/validateCollaborators");

router.post(
  "/assign-reviewer/:repoOwner/:repoId",
  validateCollaborators,
  assignRandomReviewer
);

module.exports = router;
