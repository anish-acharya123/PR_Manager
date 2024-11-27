const express = require("express");
const {
  NewCollaborator,
  GetAndStoreCollaborators,
  insertEmail,
} = require("../controllers/collaboratorController");
const router = express.Router();

router.post("/add-collaborator", NewCollaborator);
router.get("/pullrequest/totalcollaborators", GetAndStoreCollaborators);
router.post("/add-email", insertEmail);
module.exports = router;
