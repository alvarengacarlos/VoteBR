const Joi = require("joi");
const ExceptionFormatter = require("../../Service/ExceptionFormatter");

class Admin {

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

    // validateCreateElectionResearchInBlockchain(req, res, next) {
    //     const schema = Joi.object({
    //         yearElection: Joi.number().integer().positive().required(),
    //         monthElection: Joi.number().integer().positive().required(),             
    //     });
    
    //     const value = schema.validate(req.body);
    
    //     if (value.error) {
    //         return res.send(value.error.message);
    //     }
    
    //     next();
    // }

    // validateInsertCandidateInTheElectionResearchInBlockchain(req, res, next) {
    //     const schema = Joi.object({
    //         name: Joi.string().min(4).max(30).required(),
    //         numberOfCandidate: Joi.number().integer().positive().less(100).required()
    //     });
    
    //     const value = schema.validate(req.body);
    
    //     if (value.error) {
    //         return res.send(value.error.message);
    //     }
    
    //     next();
    // }
    
    // validateRemoveCandidateOfElectionResearchInBlockchain(req, res, next) {
    //     const schema = Joi.object({            
    //         numberOfCandidate: Joi.number().integer().positive().less(100).required()
    //     });
    
    //     const value = schema.validate(req.body);
    
    //     if (value.error) {
    //         return res.send(value.error.message);
    //     }
    
    //     next();
    // }

    // searchElectionResearchLikeAdminInBlockchain(req, res, next) {
    //     const schema = Joi.object({
    //         monthElection: Joi.number().integer().positive().required(), 
    //         yearElection: Joi.number().integer().positive().required(),
    //     });
    
    //     const value = schema.validate(req.body);
    
    //     if (value.error) {
    //         return res.send(value.error.message);
    //     }
    
    //     next();
    // }
    
}


module.exports = new Admin();