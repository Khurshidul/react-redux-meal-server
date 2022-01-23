const express = require("express");
const config = require("./start/config");

const app = express();

require("./start/routes.js")(app); // start routes
require("./start/database")(); // start database connection
require("./start/prod")(app);

const server = app.listen(config.PORT, () => {
  console.log(`Todo app listening at http://localhost:${config.PORT}`);
});

module.exports = server;
