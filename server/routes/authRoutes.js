const express = require("express");
const { callbackAuth } = require("../controllers/authController");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("github", { scope: ["repo", "user", "write:org"] })
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  callbackAuth
);

module.exports = router;
