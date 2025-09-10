const userModel = require("../models/user");
const jwt= require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error", "You must be logged in to access this page");
    return res.redirect("/");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).send("Unauthorized: Invalid token");
      }

      let availuser = await userModel
        .findOne({ email: availuser.email })
        .select("-password");

      req.user = availuser;
      next();
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = isLoggedIn;
