const mongoose = require("mongoose");
const config = require("./config");

module.exports = async function () {
  try {
    await mongoose.connect(config.DATABASE, {});
    console.log("MongoDB Connected");
  } catch (err) {
    throw new Error("MongoDB Connection Failed");
  }
};
