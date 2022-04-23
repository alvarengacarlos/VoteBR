const Exception = require("../Exceptions/Exception");

class IncorrectInformationReceived extends Exception {
	constructor() {
		super("INCORRECT_INFORMATION_RECEIVED", 400, "Some Information provided does not meet requirements");
	}
}

module.exports = IncorrectInformationReceived;