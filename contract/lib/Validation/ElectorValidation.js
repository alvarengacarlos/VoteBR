const Joi = require("joi");
const IncorrectInformationReceived = require("../Exceptions/IncorrectInformationReceived");

class ElectorValidation {

	validateVote(cpf, candidateNumber) {
		const schema = Joi.object({
			cpf: Joi.string().pattern(/^[0-9]+$/).min(11).max(11).required(),			
			candidateNumber: Joi.string().pattern(/^[0-9]+$/).min(2).max(2).required()
		});

		const {error, value} = schema.validate({cpf, candidateNumber});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}

	validateSearchElector(yearElectionResearch, monthElectionResearch, cpf) {
		const schema = Joi.object({
			cpf: Joi.string().pattern(/^[0-9]+$/).min(11).max(11).required(),			
			yearElectionResearch: Joi.string().pattern(/^[0-9]+$/).min(4).max(4).required(),
			monthElectionResearch: Joi.string().pattern(/^0[1-9]|1[0-2]$/).min(2).max(2).required()
		});

		const {error, value} = schema.validate({yearElectionResearch, monthElectionResearch, cpf});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}

	validateSearchElectionResearchLikeElector(year, month) {
		const schema = Joi.object({			
			year: Joi.string().pattern(/^[0-9]+$/).min(4).max(4).required(),
			month: Joi.string().pattern(/^0[1-9]|1[0-2]$/).min(2).max(2).required()			
		});

		const {error, value} = schema.validate({year, month});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}
}

module.exports = ElectorValidation;