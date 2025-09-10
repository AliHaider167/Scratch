const express = require("express");
const { route } = require("./userRoutes");
const productModel = require("../models/product");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", async (req, res) => {
  let products = await productModel.find();
  res.render("shop", { products });
});

module.exports = router;
