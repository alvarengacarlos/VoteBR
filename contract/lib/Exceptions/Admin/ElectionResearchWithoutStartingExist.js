const Exception = require("../Exception");

class ElectionResearchWithoutStartingExist extends Exception {
    constructor() {
		super("ELECTION_RESEARCH_WITHOUT_STARTING_EXIST", 400, "Electoral research without starting exist");
	}
}

module.exports = ElectionResearchWithoutStartingExist;