const AdminService = require("../Service/Admin");
const AuthService = require("../Service/Auth");

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

}

module.exports = new Admin();