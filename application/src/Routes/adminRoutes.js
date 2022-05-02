const adminController = require("../App/Controller/Admin");

const adminRoutes = (app) => {

    const prefix = "/admin";

    app.get(`${prefix}/index`, adminController.index);
    app.get(`${prefix}/login`, adminController.login);

};

module.exports = adminRoutes;