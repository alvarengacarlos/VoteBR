const apiController = require("../App/Controller/Api");
const apiValidation = require("../App/Middleware/Api");
const validateToken = require("../App/Middleware/validateToken");
const validatePlugin = require("../App/Middleware/validatePlugin");

const routesApp = (app) => {

	app.get("/search-cpf", apiValidation.validateSearchCpf, validateToken, validatePlugin, apiController.searchCpf);

};

module.exports = routesApp;