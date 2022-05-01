const AdminController = require("../App/Controller/Admin");

const adminRoutes = (app) => {

    const prefix = "/admin";

    app.get(`${prefix}/index`, AdminController.index);
    app.get(`${prefix}/login`, AdminController.login);

};

module.exports = adminRoutes;