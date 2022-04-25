const Exception = require("./Exception");

class ElectionResearchWithoutStartingDoesNotExist extends Exception {
    constructor() {
		super("ELECTION_RESEARCH_WITHOUT_STARTING_DOES_NOT_EXIST", 404, "it was not possible to find an election research without starting");
	} 
}

module.exports = ElectionResearchWithoutStartingDoesNotExist;