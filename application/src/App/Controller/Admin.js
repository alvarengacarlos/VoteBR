const AdminService = require("../Service/Admin");
const AuthService = require("../Service/Auth");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class Admin {

    loginPage(req, res) {
        return res.render("Admin/login", { pageTitle: "Login"});
    }

    auth(req, res) {
        try {
            const authService = new AuthService();
            const token = authService.authenticateAdmin(req.body);
            
            req.session.token = token;
                      
            return res.redirect(200, "/admin/dashboard-page");

        } catch (exception) {
            return res.redirect(exception.httpStatusCode, "/admin/login-page");
        }
    }

    async mountDashboardPage(req, res) {      
        try {
            const adminService = new AdminService();
            const electionResearchWithoutStartingList = await adminService.searchElectionResearchWithoutStartingLikeAdminInBlockchain();
            const electionResearchInProgressList = await adminService.searchElectionResearchInProgressLikeAdminInBlockchain();
            const electionResearchClosedList = await adminService.searchElectionResearchClosedLikeAdminInBlockchain();
        
            return res.render("Admin/dashboard", { 
                pageTitle: "Admin",
                electionResearchWithoutStartingList: electionResearchWithoutStartingList,
                electionResearchInProgressList: electionResearchInProgressList,
                electionResearchClosedList: electionResearchClosedList
            });

        } catch(exception) {
            const ef = ExceptionFormatter.returnsFormattedApiExceptions(exception);
            
            return res.status(ef.httpStatusCode).render("Admin/dashboard", { pageTitle: "Admin" });
        }
        
    }

    async createElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            await adminService.createElectionResearchInBlockchain(req.body);
            
            return res.redirect(200, "/admin/dashboard-page");

        } catch (exception) {
            const ef = ExceptionFormatter.returnsFormattedApiExceptions(exception);
            
            return res.status(ef.httpStatusCode).render("Admin/dashboard", { pageTitle: "Admin" });
        }
    }
}

module.exports = new Admin();