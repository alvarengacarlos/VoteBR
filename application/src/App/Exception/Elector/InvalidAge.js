const Exception = require("../Exception");

class InvalidAge extends Exception {    
	constructor() {
		super("INVALID_AGE", 400, "Date of birth informed not valid. You are under 16 years old");
	}    
}

module.exports = InvalidAge;