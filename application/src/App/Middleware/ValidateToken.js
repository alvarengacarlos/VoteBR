const TokenProvider = require("../Service/TokenProvider");
const Joi = require("joi");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class ValidateToken {

    validateTokenForAdmin(req, res, next) {
        const schema = Joi.object({
            token: Joi.string().token().required()             
        });

        const value = schema.validate(req.header.token);

        if (value.error) {
            return res.status(401).json({error: value.error});
        }
        
        const tokenProvider = new TokenProvider();
        try {
            tokenProvider.verifyToken(req.header.token);
        
        } catch(exception) {                     
            const ef = ExceptionFormatter.returnsFormattedApiExceptions(exception);
            return res.status(ef.httpStatusCode).json(exception);
        }

        next();
    }
}

module.exports = new ValidateToken();