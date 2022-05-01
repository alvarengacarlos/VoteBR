const express = require("express");
const routes = require("./Routes/index");

const app = express();
routes(app);

module.exports = app;