const adminController = require("../App/Controller/Admin");
const adminValidation = require("../App/Middleware/Validation/Admin");
const validateToken = require("../App/Middleware/ValidateToken");

const adminRoutes = (app) => {

    const prefix = "/admin";
        
    app.post(`${prefix}/auth`, adminValidation.validateAuthenticate, adminController.authenticate);

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

    app.post(`${prefix}/finish-election-research`, validateToken.validateTokenForAdmin,
        adminController.finishElectionResearch);

    app.get(`${prefix}/search-election-research`, validateToken.validateTokenForAdmin,
        adminValidation.validateSearchElectionResearch,
        adminController.searchElectionResearch);

    app.get(`${prefix}/search-election-research-without-starting`, validateToken.validateTokenForAdmin,
        adminController.searchElectionResearchWithoutStarting);

    app.get(`${prefix}/search-election-research-in-progress`, validateToken.validateTokenForAdmin,
        adminController.searchElectionResearchInProgress);

    app.get(`${prefix}/search-election-research-closed`, validateToken.validateTokenForAdmin,
        adminController.searchElectionResearchClosed);
};

module.exports = adminRoutes;