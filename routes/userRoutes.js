const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { userCart, removefromcart } = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", function (req, res) {
  res.send("Hello from User Routes");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logoutUser);
router.get("/cart", isLoggedIn, userCart);
router.post("/cart/remove/:id", isLoggedIn, removefromcart);

module.exports = router;
