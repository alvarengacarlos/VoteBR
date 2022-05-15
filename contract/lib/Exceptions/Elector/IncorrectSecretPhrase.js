const Exception = require("../Exception");

class IncorrectSecretPhrase extends Exception {
	constructor() {
		super("INCORRECT_SECRET_PHRASE", 400, "The secret phrase is incorrect");
	}   
}

module.exports = IncorrectSecretPhrase;