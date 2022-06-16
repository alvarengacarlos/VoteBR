const Exception = require("../Exception");

class SubmitTransactionException extends Exception {
    constructor(exception) {
		const message = SubmitTransactionException.extractMessage(exception);
		super(message[0], message[1], `Sorry it was not possible to perform the operation. Error: ${message[2]}`);
	}
	
	static extractMessage(exception) {
		const message = String(exception.responses[0].response.message);

		const index = message.indexOf("Error: ") + 7;
		const messageSliced = message.slice(index);

		return messageSliced.split(":");
	}
}

module.exports = SubmitTransactionException;