const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      res.status(400).send("User already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Error in salt generation");

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send("Error in password hashing");
        const newUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        const token = generateToken(newUser);
        res.cookie("token", token);

        res.status(201).send(newUser);
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user === null) {
      res.status(400).send("User not found");
    }

    bcrypt.compare(password, user.password, (err, isMatched) => {
      if (err) return res.status(500).send("Error in password comparison");
      if (!isMatched) return res.status(400).send("Invalid password");

      const token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/");
  } catch (error) {
    return res.status(500).send("Error in logging out" + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
