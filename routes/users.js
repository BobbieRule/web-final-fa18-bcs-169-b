var express = require("express");
var router = express.Router();
const { UsersModel } = require("../models/usersModel");
const signUpValidation = require("../middlewares/signUpValidation");
const signInValidation = require("../middlewares/signInValidation");
const validateUser = require("../middlewares/validateUser");

router.get("/signIn", function (req, res) {
  try {
    return res.status(200).render("signIn", { title: "PSL | Sign In" });
  } catch (error) {
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.post("/signIn", signInValidation, async function (req, res) {
  try {
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.get("/signUp", function (req, res) {
  try {
    return res.status(200).render("signUp", { title: "PSL | Sign Up" });
  } catch (error) {
    return res.status(400).send("<h1>Bad Request</h1>");
  }
});

router.post(
  "/signUp",
  validateUser,
  signUpValidation,
  async function (req, res) {
    try {
      let user = new UsersModel();
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.gender = req.body.gender;

      await user.generateHashedPassword();

      await user.save();

      return res.status(200).redirect("/users/signIn");
    } catch (error) {
      console.log(error);
      return res.status(400).send("<h1>Bad Request</h1>");
    }
  }
);

router.get("/logout", function (req, res) {
  req.session.token = null;
  return res.status(200).redirect("/");
});

module.exports = router;
