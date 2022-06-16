const TokenProvider = require("../Provider/TokenProvider");
const TokenExpiredException = require("../Exception/TokenExpired");
const formatException = require("../Provider/formatException");

class ValidateToken {

    validateTokenForAdmin(req, res, next) {
        const token = req.headers['token'];

        if (!token) {
            const exception = new TokenExpiredException();
            const exceptionFormated = formatException(exception);            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }

        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyTokenAdmin(token);
        
        } catch(exception) {                     
            const exceptionFormated = formatException(exception.message);            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }

        next();
    }

    validateTokenForElector(req, res, next) {
        const token = req.headers['token'];

        if (!token) {
            const exception = new TokenExpiredException();
            const exceptionFormated = formatException(exception);            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }

        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyTokenElector(token);
        
        } catch(exception) {                     
            const exceptionFormated = formatException(exception.message);            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }

        next();
    }
}

module.exports = new ValidateToken();