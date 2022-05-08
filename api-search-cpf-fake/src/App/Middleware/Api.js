const Joi = require("joi");

class Api {

	validateSearchCpf(req, res, next) {
		const schema = Joi.object({
			token: Joi.string().token().required(),
			cpf: Joi.string().min(11).max(11).required(),
			"data-nascimento": Joi.string().required(),
			plugin: Joi.string().required()
		});

		const value = schema.validate(req.query);

		if (value.error) {                        
			return res.status(400).json(value.error.message);
		}
        
		next();
	}

}

module.exports = new Api();