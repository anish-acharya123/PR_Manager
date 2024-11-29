const express = require("express");
const router = express.Router();
const {
  assignRandomReviewer,
  RemoveReviewers,
} = require("../controllers/pullrequestController");
const validateCollaborators = require("../middleware/validateCollaborators");

router.post(
  "/assign-reviewer/:repoOwner/:repoId",
  validateCollaborators,
  assignRandomReviewer
);


router.post("/remove-reviewer", RemoveReviewers);

module.exports = router;
