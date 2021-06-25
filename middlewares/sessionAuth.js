function sessionAuth(req, res, next) {
  res.locals.token = req.session.token;
  next();
}

module.exports = sessionAuth;
