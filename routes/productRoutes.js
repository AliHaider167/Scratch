const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { createProduct } = require("../controllers/productController");

router.get("/", function (req, res) {
  res.json("Hello from Products Routes");
});

router.post("/create", upload.single("image"), createProduct);

module.exports = router;
