const express = require("express");
const { userLogout } = require("../controllers/userController");
const router = express.Router();

router.get("/logout", userLogout);

module.exports = router;
