const express = require("express");
const upload = require("../config/multer.config");
const router = express.Router();
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const isloggedIn = require('../middlewares/isLogggedIn')

router.post("/create", upload.single("image"),isloggedIn, async (req, res) => {
  try {
    let { name, price, discount, bgcolor, textcolor, panelcolor } = req.body;
    let user = await userModel.findOne({email :req.user.email})
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      textcolor,
      panelcolor,
    }); 
    user.cart.push(product._id);
    await user.save();
    req.flash("success", "Product created")
    return res.redirect('/owners/admin')
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
