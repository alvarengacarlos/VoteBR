const Exception = require("../Exception");

class IncorrectSecretPhrase extends Exception {
	constructor() {
		super("INCORRECT_SECRET_PHRASE", 500, "The secret phrase is incorrect");
	}   
}

module.exports = IncorrectSecretPhrase;