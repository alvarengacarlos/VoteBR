const Joi = require("joi");
const IncorrectInformationReceived = require("../Exceptions/IncorrectInformationReceived");

class AdminValidation {

	validateCreateElectionResearch(year, month) {
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

	validateInsertCandidateInTheElectionResearch(name, candidateNumber, photoUrl) {
		const schema = Joi.object({
			name: Joi.string().min(4).max(30).required(),
			candidateNumber: Joi.string().pattern(/^[0-9]+$/).min(2).max(2).required(),
			photoUrl: Joi.string().uri().required()
		});
		
		const {error, value} = schema.validate({name, candidateNumber, photoUrl});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;		
	}

	validateRemoveCandidateOfElectionResearch(candidateNumber) {
		const schema = Joi.object({
			candidateNumber: Joi.string().pattern(/^[0-9]+$/).min(2).max(2).required()
		});
		
		const {error, value} = schema.validate({candidateNumber});
		
		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}

	validateSearchElectionResearch(year, month) {
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

module.exports = AdminValidation;