const express = require("express");
const routes = require("./Routes/index");
const config = require("./config");

const app = express();
routes(app);
config(app, express);

module.exports = app;