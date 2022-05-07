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

    dashboardPage(req, res) {        
        return res.render("Admin/dashboard", { pageTitle: "Admin" });
    }

    createElectionResearch(req, res) {
        try {
            const adminService = new AdminService();
            adminService.createElectionResearchInBlockchain(req.body);
            
            return res.status(200).render("Admin/dashboard", { pageTitle: "Admin" });

        } catch (exception) {
            const ef = ExceptionFormatter.returnsFormattedApiExceptions(exception);
            
            return res.status(ef.httpStatusCode).render("Admin/dashboard", { pageTitle: "Admin" });
        }
    }
}

module.exports = new Admin();