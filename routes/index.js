const express = require("express");
const { route } = require("./userRoutes");
const productModel = require("../models/product");
const userModel = require("../models/user");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  res.render("shop", { products });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  res.redirect("/shop");
});

module.exports = router;
