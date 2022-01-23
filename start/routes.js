const { json } = require("express");
const error = require("../middlewares/error");
const products = require("../routes/product");
const cors = require("cors");

module.exports = function (app) {
  app.use(cors());
  app.use(json());

  app.use("/products", products);
  app.use("*", (req, res) => {
    res.status(404).send("what???");
  });
  app.use(error);
};
