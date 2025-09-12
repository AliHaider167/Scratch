const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  picture: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  orders: {
    type: Array.isArray() ? Array : [],
    default: [],
  },
});

module.exports = mongoose.model("users", userSchema);