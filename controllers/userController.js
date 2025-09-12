const userModel = require("../models/user");
const productModel = require("../models/product");
const isLoggedIn = require("../middlewares/isLoggedIn");
const c = require("config");

const userCart = async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  res.render("usercart", { products: user.cart });
};

const removefromcart = async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.pull(req.params.id);
  await user.save();
  res.redirect("/users/cart");
};

module.exports = {
  userCart,
  removefromcart,
};
