const express = require("express");
const { NewCollaborator } = require("../controllers/collaboratorController");
const router = express.Router();

router.post("/add-collaborator", NewCollaborator);

module.exports = router;
