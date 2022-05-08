const Exception = require("./Exception");

class InternalFailureWhenSearchingVoter extends Exception {
    constructor() {
		super("INTERNAL_FAILURE_WHEN_SEARCHING_VOTER", 500, `Sorry. We are having internal problems`);
	}  
}

module.exports = InternalFailureWhenSearchingVoter;