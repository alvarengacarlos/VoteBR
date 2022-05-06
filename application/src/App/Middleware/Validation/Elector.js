const Joi = require("joi");

class Elector {

    validateVote(req, res, next) {
        const schema = Joi.object({
            cpf: Joi.number().integer().positive().less(99999999999).required(),
            birthDate: Joi.date().less("now").required(),
            numberOfCandidate: Joi.number().integer().positive().less(100).required()
        });

        const value = schema.validate(req.body);

        if (value.error) {
            return res.send(value.error.message);
        }

        next();
    }

    validateSearchElector(req, res, next) {
        const schema = Joi.object({
            monthElection: Joi.required().integer().positive(), 
            yearElection: Joi.required().integer().positive(),
            cpf: Joi.number().integer().positive().less(99999999999).required()
        });

        const value = schema.validate(req.body);

        if (value.error) {
            return res.send(value.error.message);
        }

        next();
    }

    searchElectionResearchLikeElector(req, res, next) {
        const schema = Joi.object({
            monthElection: Joi.required().integer().positive(), 
            yearElection: Joi.required().integer().positive()           
        });

        const value = schema.validate(req.body);

        if (value.error) {
            return res.send(value.error.message);
        }

        next();
    }

}

module.exports = new Elector();