const { UsersModel } = require("../models/usersModel");

async function signUpValidation(req, res, next) {
  let alreadyUser = await UsersModel.findOne({ email: req.body.email });

  if (alreadyUser) {
    return res.render("signUp", {
      title: "PSL | Sign Up",
      error: "User with entered email already exists",
    });
  }
  next();
}

module.exports = signUpValidation;
