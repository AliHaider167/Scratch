const productModel = require("../models/product");

const createProduct = async (req, res) => {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  const image = req.file.buffer;

  try {
    const createdproduct = await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image,
    });
    req.flash("success", "Product created successfully"); 
    res.redirect("/owners/admin");
  } catch (error) {
    flash("error", error.message);
    res.redirect("/owners/admin");
  }
};

module.exports = {
  createProduct,
};
