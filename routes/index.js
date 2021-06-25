var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.token) {
    user = jwt.decode(req.session.token);
    return res.render("index", { title: "Welcome to PSL", user });
  }

  return res.render("index", { title: "Welcome to PSL" });
});

module.exports = router;
