var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { MatchesModel } = require("../models/matchesModel");
const checkTeams = require("../middlewares/checkTeams");

router.get("/add", async function (req, res) {
  try {
    return res.render("addMatch", { title: "PSL | Add Match" });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.post("/add", checkTeams, async function (req, res) {
  try {
    let match = new MatchesModel();

    match.teamA = req.body.teamA;
    match.teamB = req.body.teamB;
    match.city = req.body.city;
    match.date = req.body.day + "/" + req.body.month + "/" + req.body.year;

    await match.save();

    return res.redirect("/matches/list");
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

router.get("/list", async function (req, res) {
  try {
    const matchesList = await MatchesModel.find();
    return res.render("matchList", {
      title: "PSL | List of Match",
      matchesList,
    });
  } catch (error) {
    return res.status(400).send("Bad Request");
  }
});

module.exports = router;
