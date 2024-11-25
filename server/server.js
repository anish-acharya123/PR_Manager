const express = require("express");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./configs/passport");
const cors = require("cors");
const connectDb = require("./configs/mongodb");
const app = express();

connectDb();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "random-secret", // Replace with a secure secret in production
    resave: false,
    saveUninitialized: false,
  })
);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());

// Routes
//authoroutes
app.use("/auth/github", require("./routes/authRoutes"));
//user routes
app.use("/logout", require("./routes/userRoutes"));
// pull request
app.use("/api", require("./routes/pullrequestRoutes"));
//collaborator adddding
app.use("/collaborator", require("./routes/collaboratorRoutes"));
//assign reviwer
app.use("/reviewer", require("./routes/reviwerRoutes"));
// app.use("/api/github", require("./routes/pullrequestRoutes"))

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
