const ExceptionFormatter = require("../../Service/ExceptionFormatter");
const Joi = require("joi");

class Elector {

    validateAuth(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const value = schema.validate(req.body);

        if (value.error) {            
            const ef = ExceptionFormatter.formatJoiException(value.error);            
            return res.status(ef.httpStatusCode).json(ef);
        }
        
        next();
    }

    validateVote(req, res, next) {
        const schema = Joi.object({
            cpf: Joi.number().integer().positive().less(99999999999).required(),
            birthDate: Joi.date().less("now").required(),
            candidateNumber: Joi.number().integer().positive().less(100).required()
        });

        const value = schema.validate(req.body);

        if (value.error) {
            const ef = ExceptionFormatter.formatJoiException(value.error);            
            return res.status(ef.httpStatusCode).json(ef);
        }

        next();
    }

    validateSearchElector(req, res, next) {
        const schema = Joi.object({
            monthElection: Joi.number().integer().positive().required(), 
            yearElection: Joi.number().integer().positive().required(),
            cpf: Joi.number().integer().positive().less(99999999999).required(),
            secretPhrase: Joi.string().required()
        });

        const value = schema.validate(req.body);

        if (value.error) {
            const ef = ExceptionFormatter.formatJoiException(value.error);            
            return res.status(ef.httpStatusCode).json(ef);
        }

        next();
    }

}

module.exports = new Elector();