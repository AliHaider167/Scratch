const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  res.send("Hello from Owner Routes");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    const owner = await ownerModel.find();
    if (owner.length > 0) {
      res.status(400).send("Owner already exists");
    }

    const { fullname, email, password, gstin } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      if (!err) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (!err) {
            const createdOwner = await ownerModel.create({
              fullname,
              email,
              password: hash,
              gstin,
            });
            res.send(createdOwner);
          }
        });
      }
    });
  });
}

module.exports = router;
