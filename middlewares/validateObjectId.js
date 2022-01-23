const { Types } = require("mongoose");

module.exports = function (req, res, next) {
  // if id is a valid object id then proceed to query it
  if (Types.ObjectId.isValid(req.params.id)) next();
  else return res.status(404).send("ID is not valid.");
};
