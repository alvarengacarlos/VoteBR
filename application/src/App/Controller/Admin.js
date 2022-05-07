const AdminService = require("../Service/Admin");
const AuthService = require("../Service/Auth");
const ExceptionFormatterService = require("../Service/ExceptionFormatter");

class Admin {

    loginPage(req, res) {
        return res.render("Admin/login", { pageTitle: "Login"});
    }

    auth(req, res) {
        try {
            const adminService = new AuthService();
            const token = adminService.authenticateAdmin(req.body);
            
            return res.status(200).render("Admin/dashboard", { pageTitle: "Dashboard" });

        } catch (exception) {
            const ef = new ExceptionFormatterService();
            const formattedException = ef.returnsFormattedApiExceptions(exception);

            return res.status(formattedException.httpStatusCode).render("Admin/login", { pageTitle: "Login" });
        }
    }

    dashboardPage(req, res) {        
        return res.render("Admin/dashboard", { pageTitle: "Admin" });
    }

}

module.exports = new Admin();