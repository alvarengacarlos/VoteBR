const adminController = require("../App/Controller/Admin");
const adminValidation = require("../App/Middleware/Validation/Admin");
const validateToken = require("../App/Middleware/ValidateToken");

const adminRoutes = (app) => {

    const prefix = "/admin";
    
    app.get(`${prefix}/login-page`, validateToken.validateTokenForLoginPage, adminController.loginPage);
    
    app.post(`${prefix}/auth`, adminValidation.validateLogin, adminController.auth);

    app.get(`${prefix}/dashboard-page`, validateToken.validateTokenForAnyRoutes, adminController.dashboardPage);    

    app.post(`${prefix}/create-election-research`);

    app.post(`${prefix}/insert-candidate-in-the-election-research`);

    app.delete(`${prefix}/remove-candidate-of-election-research`);

    app.post(`${prefix}/begin-collecting-votes`);

    app.post(`${prefix}/finish-election-research`);

    app.get(`${prefix}/search-election-research`);

    app.get(`${prefix}/search-election-research-in-progress`);

    app.get(`${prefix}/search-election-research-closed`);
};

module.exports = adminRoutes;