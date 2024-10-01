const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const generateToken = require("../utils/generateToken");

async function authController(req, res) {
  try {
    let { fullname, password, email } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "User already exist");
      return res.redirect("/");
    }

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createduser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(createduser);
        res.cookie("token", token);
        res.redirect("/shop");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = authController;
