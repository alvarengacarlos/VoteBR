const adminRoutes = require("./adminRoutes");
const electorRoutes = require("./electorRoutes");

const routes = (app) => {

    app.use((req, res, next) => {
        adminRoutes(app);
        electorRoutes(app);
        
        next();
    });

};

module.exports = routes;