module.exports = function (validate) {
  return async (req, res, next) => {
    const { value, error } = validate(req.body);
    // if validation fails then send errors
    if (error)
      return res.status(400).json(error?.details.map((e) => e.message));

    req.body = value;
    next();
  };
};
