const Joi = require("joi");

class Admin {

    validateLogin(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const value = schema.validate(req.body);

        if (value.error) {
            return res.send(value.error.message);
        }

        next();
    }

    validateCreateElectionResearchInBlockchain(req, res, next) {
        const schema = Joi.object({
            monthElection: Joi.required().integer().positive(), 
            yearElection: Joi.required().integer().positive(),
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {
            return res.send(value.error.message);
        }
    
        next();
    }

    validateInsertCandidateInTheElectionResearchInBlockchain(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(4).max(30).required(),
            numberOfCandidate: Joi.number().integer().positive().less(100).required()
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {
            return res.send(value.error.message);
        }
    
        next();
    }
    
    validateRemoveCandidateOfElectionResearchInBlockchain(req, res, next) {
        const schema = Joi.object({            
            numberOfCandidate: Joi.number().integer().positive().less(100).required()
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {
            return res.send(value.error.message);
        }
    
        next();
    }

    searchElectionResearchLikeAdminInBlockchain(req, res, next) {
        const schema = Joi.object({
            monthElection: Joi.required().integer().positive(), 
            yearElection: Joi.required().integer().positive(),
        });
    
        const value = schema.validate(req.body);
    
        if (value.error) {
            return res.send(value.error.message);
        }
    
        next();
    }
    
}


module.exports = new Admin();