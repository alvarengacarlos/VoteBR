const AdminService = require("../Service/Admin");
const AuthService = require("../Service/Auth");
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
            
            return res.status(200).json();

        } catch (exception) {
            const ef = ExceptionFormatter.formatContractExceptions(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async insertCandidateInTheElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.insertCandidateInTheElectionResearchInBlockchain(req.body);

            return res.status(200).json();
        
        } catch(exception) {
            const ef = ExceptionFormatter.formatContractExceptions(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async removeCandidateOfElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.removeCandidateOfElectionResearchInBlockchain(req.body);

            return res.status(200).json();

        } catch(exception) {
            const ef = ExceptionFormatter.formatContractExceptions(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    // async searchElectionResearchWithoutStarting(req, res) {
    //     const adminService = new AdminService();
    //     const electionResearchWithoutStartingList = await adminService.searchElectionResearchWithoutStartingLikeAdminInBlockchain();
        
    // }

    // async searchElectionResearchInProgress(req, res) {
    //     const adminService = new AdminService();
    //     const electionResearchInProgressList = await adminService.searchElectionResearchInProgressLikeAdminInBlockchain();        
    // }

    // async searchElectionResearchClosed(req, res) {
    //     const adminService = new AdminService();
    //     const electionResearchClosedList = await adminService.searchElectionResearchClosedLikeAdminInBlockchain();

    //     return res.status();
    // }
}

module.exports = new Admin();