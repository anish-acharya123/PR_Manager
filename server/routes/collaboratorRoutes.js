const express = require("express");
const {
  NewCollaborator,
  GetAndStoreCollaborators,
} = require("../controllers/collaboratorController");
const router = express.Router();

router.post("/add-collaborator", NewCollaborator);
router.get("/pullrequest/totalcollaborators", GetAndStoreCollaborators);

module.exports = router;
