const Joi = require("joi");
const JoiWrapper = require("../../Exception/JoiWrapperException");
const formatException = require("../../Provider/formatException");

class Admin {

    validateAuthenticate(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const value = schema.validate(req.body);

        if (value.error) {         
            const exception = new JoiWrapper(value.error.message);             
            const exceptionFormated = formatException(exception);

            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
        
        next();
    }

    validateCreateElectionResearch(req, res, next) {
        const schema = Joi.object({
            year: Joi.number().integer().positive().required(),
            month: Joi.number().integer().positive().required()           
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {         
            const exception = new JoiWrapper(value.error.message);             
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    
        next();
    }

    validateInsertCandidateInTheElectionResearch(req, res, next) {
        const schema = Joi.object({
            candidateName: Joi.string().min(4).max(30).required(),
            candidateNumber: Joi.number().integer().positive().less(100).required(),
            photoUrl: Joi.string().uri().required()
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {         
            const exception = new JoiWrapper(value.error.message);             
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    
        next();
    }
    
    validateRemoveCandidateOfElectionResearch(req, res, next) {
        const schema = Joi.object({            
            candidateNumber: Joi.number().integer().positive().less(100).required()
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {         
            const exception = new JoiWrapper(value.error.message);             
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    
        next();
    }

    validateSearchElectionResearch(req, res, next) {
        const schema = Joi.object({
            month: Joi.number().integer().positive().required(), 
            year: Joi.number().integer().positive().required(),
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {         
            const exception = new JoiWrapper(value.error.message);             
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    
        next();
    }
    
}


module.exports = new Admin();