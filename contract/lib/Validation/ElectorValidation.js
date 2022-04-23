const Joi = require("joi");
const IncorrectInformationReceived = require("../Exceptions/IncorrectInformationReceived");

class ElectorValidation {

	validateVote(cpf, year, month, day, candidateNumber) {
		const schema = Joi.object({
			cpf: Joi.string().pattern(/^[0-9]+$/).min(11).max(11).required(),
			year: Joi.string().pattern(/^[0-9]+$/).min(4).max(4).required(),
			month: Joi.string().pattern(/^0[1-9]|1[0-2]$/).min(2).max(2).required(),
			day: Joi.string().pattern(/^0[1-9]|1[0-9]|2[0-9]|3[0-1]$/).min(2).max(2).required(),
			candidateNumber: Joi.string().pattern(/^[0-9]+$/).min(2).max(2).required()
		});

		const {error, value} = schema.validate({cpf, year, month, day, candidateNumber});

		if (error) {
			throw new IncorrectInformationReceived();
		}

		return value;
	}

}

module.exports = ElectorValidation;