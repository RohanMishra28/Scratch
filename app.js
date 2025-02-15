const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/connection");
const ownerRouter = require("./routes/owner.route");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const indexRouter = require("./routes/index");
const dotenv = require('dotenv')
const expressSession = require('express-session')
const flash = require("connect-flash")


app.use(cookieParser());
dotenv.config()


app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret: process.env.EXPRESS_SESSION_SECRET
}))


app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);


app.listen(3000);