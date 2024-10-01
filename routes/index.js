const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const authController = require("../controllers/authController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loggingIn = require("../controllers/loggingIn");
const isLoggedIn = require("../middlewares/isLogggedIn");
const productModel = require("../models/product.model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.post("/users/register", authController);

router.post("/users/login", loggingIn);

router.get("/users/logout", isLoggedIn, (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount)

  res.render("cart", { user ,bill});
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added");
  return res.redirect("/shop");
});

module.exports = router;
