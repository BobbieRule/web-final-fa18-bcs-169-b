const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const matchesSchema = new mongoose.Schema({
  city: String,
  date: String,
  teamA: String,
  teamB: String,
});

const MatchesModel = mongoose.model("matches", matchesSchema);

function validateMatch(data) {
  const schema = joi.object({
    city: joi.string().required(),
    date: joi.string().email().required(),
    teamA: joi.string().required(),
    teamB: joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
}

module.exports = { MatchesModel, validateMatch };
