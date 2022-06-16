const Exception = require("./Exception");

class JoiWrapperException extends Exception {
    constructor(message) {
		super("INCORRECT_INFORMATIONS", 400, message);
	}  
}

module.exports = JoiWrapperException;