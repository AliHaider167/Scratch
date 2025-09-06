const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  isadmin: Boolean,
  contact: Number,
  picture: String,
  cart: {
    Type: Array,
    default: [],
  },
  orders: {
    Type: Array,
    default: [],
  },
});

module.exports = mongoose.model("users", userSchema);
