const Exception = require("../Exception");

class ExternalApiException extends Exception {
    constructor(message) {
		super("EXTERNAL_API_EXCEPTION", 400, message);
	}   
}

module.exports = ExternalApiException;