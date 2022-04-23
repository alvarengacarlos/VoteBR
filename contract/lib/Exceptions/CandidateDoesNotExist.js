const Exception = require("./Exception");

class CandidateDoesNotExist extends Exception {
	constructor() {
		super("CANDIDATE_DOES_NOT_EXIST", 400, "Informed candidate does not exist");
	}   
}

module.exports = CandidateDoesNotExist;