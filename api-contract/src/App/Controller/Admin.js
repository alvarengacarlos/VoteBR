const AdminService = require("../Service/Admin");
const AuthenticateService = require("../Service/Authentication");
const formatException = require("../Provider/formatException");

class Admin {

    authenticate(req, res) {
        try {
            const authenticateService = new AuthenticateService();
            const token = authenticateService.authenticateAdmin(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async createElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.createElectionResearch(req.body);
            
            return res.status(201).json();

        } catch (exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async insertCandidateInTheElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.insertCandidateInTheElectionResearch(req.body);

            return res.status(201).json();
        
        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async removeCandidateOfElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.removeCandidateOfElectionResearch(req.body);

            return res.status(204).json();

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async beginCollectingVotes(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.beginCollectingVotes();

            return res.status(200).json();

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async finishElectionResearchAndCollectingVotes(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.finishElectionResearchAndCollectingVotes();

            return res.status(200).json();

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async searchElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearch(req.body);
        
            return res.status(200).json({result: result});
        
        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }
    
    async searchElectionResearchWithoutStarting(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchWithoutStarting();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }        
        
    }

    async searchElectionResearchInProgress(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchInProgress();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }          
    }

    async searchElectionResearchClosed(req, res) {
        try {
            const adminService = new AdminService();
            const result = await adminService.searchElectionResearchClosed();    
            
            return res.status(200).json({result: result});

        } catch(exception) {
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }    
    }
}

module.exports = new Admin();