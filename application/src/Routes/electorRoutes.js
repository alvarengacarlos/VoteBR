const ElectorController = require("../App/Controller/Elector");

const electorRoutes = (app) => {

    app.get("/index", ElectorController.index);

};

module.exports = electorRoutes;