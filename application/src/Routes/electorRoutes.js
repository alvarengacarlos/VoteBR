const electorController = require("../App/Controller/Elector");
const electorValidation = require("../App/Middleware/Validation/Elector");
const validateToken = require("../App/Middleware/ValidateToken");

const electorRoutes = (app) => {

    const prefix = "/elector";

    app.post(`${prefix}/auth`, electorValidation.validateAuth, electorController.auth);
    
    app.post(`${prefix}/vote`, validateToken.validateTokenForElector,
        electorValidation.validateVote, electorController.vote);
    
        // //app.get("/research-results", () => {});

};

module.exports = electorRoutes;