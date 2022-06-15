const Joi = require("joi");
const IncorrectInformationReceived = require("../Exceptions/IncorrectInformationReceived");

class ElectorValidation {

	validateVote(cpfHashing, candidateNumber, secretPhrase) {
		const schema = Joi.object({
			cpfHashing: Joi.string().alphanum().required(),			
			candidateNumber: Joi.string().pattern(/^[0-9]+$/).min(2).max(2).required(),
			secretPhrase: Joi.string().required()
		});

		const {error, value} = schema.validate({cpfHashing, candidateNumber, secretPhrase});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}

	validateSearchElector(yearElectionResearch, monthElectionResearch, cpfHashing, secretPhrase) {
		const schema = Joi.object({
			cpfHashing: Joi.string().alphanum().required(),			
			yearElectionResearch: Joi.string().pattern(/^[0-9]+$/).min(4).max(4).required(),
			monthElectionResearch: Joi.string().pattern(/^0[1-9]|1[0-2]$/).min(2).max(2).required(),
			secretPhrase: Joi.string().required()
		});

		const {error, value} = schema.validate({yearElectionResearch, monthElectionResearch, cpfHashing, secretPhrase});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}
	
}

module.exports = ElectorValidation;