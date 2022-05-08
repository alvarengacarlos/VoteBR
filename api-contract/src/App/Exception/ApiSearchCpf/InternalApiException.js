const Exception = require("../Exception");

class InternalApiException extends Exception {
    constructor(message) {
		super("INTERNAL_API_EXCEPTION", 500, message);
	}   
}

module.exports = InternalApiException;