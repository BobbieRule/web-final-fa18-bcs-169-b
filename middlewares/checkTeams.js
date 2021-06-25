function checkTeams(req, res, next) {
  if (req.body.teamA == req.body.teamB) {
    return res.render("addMatch", {
      title: "PSL | Add Match",
      error: "Teams Must be Different",
    });
  }

  if (
    !req.body.teamA ||
    !req.body.teamB ||
    !req.body.day ||
    !req.body.month ||
    !req.body.year ||
    !req.body.city
  ) {
    return res.render("addMatch", {
      title: "PSL | Add Match",
      error: "Give Complete Information",
    });
  }

  next();
}

module.exports = checkTeams;
