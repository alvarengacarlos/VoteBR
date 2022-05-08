const Exception = require("../Exception");

class GeneralContractException extends Exception {
    constructor(exception) {
		const exceptionMessage = GeneralContractException.extractMessage(exception);
		super("GENERAL_CONTRACT_EXCEPTION", 500, `Sorry it was not possible to perform the operation. Error: ${exceptionMessage}`);
	}
	
	static extractMessage(exception) {
		const message = String(exception.responses[0].response.message);

		const splited = message.split(":");

		const lastPosition = (splited.length - 1);
		
		return splited[lastPosition];
	}
}

module.exports = GeneralContractException;