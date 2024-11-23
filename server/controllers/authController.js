const callbackAuth = (req, res) => {
  const token = req.user.accessToken;

  res.cookie("access_token", token, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000,
  });
  res.redirect(`http://localhost:5173/dashboard`);
};

module.exports = { callbackAuth };
