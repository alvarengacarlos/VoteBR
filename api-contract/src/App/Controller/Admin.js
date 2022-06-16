const AdminService = require("../Service/Admin");
const AuthService = require("../Service/Authentication");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class Admin {

    auth(req, res) {
        try {
            const authService = new AuthService();
            const token = authService.authenticateAdmin(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async createElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.createElectionResearchInBlockchain(req.body);
            
            return res.status(201).json();

        } catch (exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async insertCandidateInTheElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.insertCandidateInTheElectionResearchInBlockchain(req.body);

            return res.status(201).json();
        
        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async removeCandidateOfElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.removeCandidateOfElectionResearchInBlockchain(req.body);

            return res.status(204).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async beginCollectingVotes(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.beginCollectingVotesInBlockchain();

            return res.status(200).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async finishElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.finishElectionResearchInBlockchain();

            return res.status(200).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchInBlockchain(req.body);
        
            return res.status(200).json({result: result});
        
        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }
    
    async searchElectionResearchWithoutStarting(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchWithoutStartingInBlockchain();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }        
        
    }

    async searchElectionResearchInProgress(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchInProgressInBlockchain();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }          
    }

    async searchElectionResearchClosed(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchClosedInBlockchain();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }    
    }
}

module.exports = new Admin();