const adminController = require("../App/Controller/Admin");
const adminValidation = require("../App/Middleware/Validation/Admin");
const validateToken = require("../App/Middleware/ValidateToken");

const adminRoutes = (app) => {

    const prefix = "/admin";
        
    app.post(`${prefix}/auth`, adminValidation.validateAuth, adminController.auth);

    app.post(`${prefix}/create-election-research`, validateToken.validateTokenForAdmin, 
        adminValidation.validateCreateElectionResearch, adminController.createElectionResearch);

    app.post(`${prefix}/insert-candidate-in-the-election-research`, validateToken.validateTokenForAdmin,
        adminValidation.validateInsertCandidateInTheElectionResearch,
        adminController.insertCandidateInTheElectionResearch);

    app.delete(`${prefix}/remove-candidate-of-election-research`, validateToken.validateTokenForAdmin,
        adminValidation.validateRemoveCandidateOfElectionResearch,
        adminController.removeCandidateOfElectionResearch);

    app.post(`${prefix}/begin-collecting-votes`, validateToken.validateTokenForAdmin,
        adminController.beginCollectingVotes);

    // app.post(`${prefix}/finish-election-research`);

    // app.get(`${prefix}/search-election-research`);
};

module.exports = adminRoutes;