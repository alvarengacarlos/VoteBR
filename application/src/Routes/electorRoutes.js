const electorController = require("../App/Controller/Elector");

const electorRoutes = (app) => {

    app.get("/index", electorController.index);

};

module.exports = electorRoutes;