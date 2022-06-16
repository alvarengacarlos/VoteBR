const AdminService = require("../Service/Admin");
const AuthenticateService = require("../Service/Authentication");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class Admin {

    authenticate(req, res) {
        try {
            const authenticateService = new AuthenticateService();
            const token = authenticateService.authenticateAdmin(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async createElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.createElectionResearch(req.body);
            
            return res.status(201).json();

        } catch (exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async insertCandidateInTheElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.insertCandidateInTheElectionResearch(req.body);

            return res.status(201).json();
        
        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async removeCandidateOfElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.removeCandidateOfElectionResearch(req.body);

            return res.status(204).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async beginCollectingVotes(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.beginCollectingVotes();

            return res.status(200).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async finishElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.finishElectionResearch();

            return res.status(200).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearch(req.body);
        
            return res.status(200).json({result: result});
        
        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }
    
    async searchElectionResearchWithoutStarting(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchWithoutStarting();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }        
        
    }

    async searchElectionResearchInProgress(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchInProgress();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }          
    }

    async searchElectionResearchClosed(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchClosed();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }    
    }
}

module.exports = new Admin();