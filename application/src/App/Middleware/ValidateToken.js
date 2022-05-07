const TokenProvider = require("../Service/TokenProvider");

class ValidateToken {

    validateTokenForAnyRoutes(req, res, next) {
        if (req.session.token == undefined) {                   
            return res.redirect(401, "/admin/login-page");
        }        
        
        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyToken(req.session.token);
        
        } catch(exception) {                     
            return res.redirect(exception.httpStatusCode, "/admin/login-page");
        }

        next();
    }

    validateTokenForLoginPage(req, res, next) {        
        const tokenProvider = new TokenProvider();
        try {
            if (req.session.token != undefined) {                
                tokenProvider.verifyToken(req.session.token);
                return res.redirect(200, "/admin/dashboard-page");
            }

        } catch(exception) {                     
            return res.redirect(exception.httpStatusCode, "/admin/login-page");
        }

        next();
    }
}

module.exports = new ValidateToken();