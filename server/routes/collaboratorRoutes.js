const express = require("express");
const {
  NewCollaborator,
  GetAndStoreCollaborators,
  insertEmail,  
  updateCollaboratorEmail,
} = require("../controllers/collaboratorController");
const router = express.Router();

router.post("/add-collaborator", NewCollaborator);
router.get("/pullrequest/totalcollaborators", GetAndStoreCollaborators);
router.patch("/update-email", updateCollaboratorEmail);
// router.post("/add-email", insertEmail);
module.exports = router;
