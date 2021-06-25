var { validate } = require("../models/usersModel");

function validateUser(req, res, next) {
  let { error } = validate(req.body);

  if (error) {
    return res.status(400).render("signUp", {
      error: error.details[0].message,
    });
  }

  next();
}

module.exports = validateUser;
