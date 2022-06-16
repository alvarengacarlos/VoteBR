const Exception = require("../Exception");

class EvaluateTransactionException extends Exception {
    constructor(exception) {
		const message = EvaluateTransactionException.extractMessage(exception);
		super(message[0], message[1], `Sorry it was not possible to perform the operation. Error: ${message[2]}`);
	}
	
	static extractMessage(exception) {
		const message = String(exception.message);

		const index = message.indexOf("Error: ") + 7;
		const messageSliced = message.slice(index);

		return messageSliced.split(":");
	}
}

module.exports = EvaluateTransactionException;