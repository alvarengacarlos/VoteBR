const TokenProvider = require("../Service/TokenProvider");
const ExceptionFormatter = require("../Service/ExceptionFormatter");
const TokenExpired = require("../Exception/TokenExpired");

class ValidateToken {

    validateTokenForAdmin(req, res, next) {
        const token = req.headers['token'];

        if (!token) {
            const exception = new TokenExpired();
            const ef = ExceptionFormatter.formatApiException(exception);
            res.status(ef.httpStatusCode).json(ef) 
        }

        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyTokenAdmin(token);
        
        } catch(exception) {                     
            const ef = ExceptionFormatter.formatApiException(exception);
            return res.status(ef.httpStatusCode).json(ef);
        }

        next();
    }

    validateTokenForElector(req, res, next) {
        const token = req.headers['token'];

        if (!token) {
            const exception = new TokenExpired();
            const ef = ExceptionFormatter.formatApiException(exception);
            res.status(ef.httpStatusCode).json(ef) 
        }

        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyTokenElector(token);
        
        } catch(exception) {                     
            const ef = ExceptionFormatter.formatApiException(exception);
            return res.status(ef.httpStatusCode).json(ef);
        }

        next();
    }
}

module.exports = new ValidateToken();