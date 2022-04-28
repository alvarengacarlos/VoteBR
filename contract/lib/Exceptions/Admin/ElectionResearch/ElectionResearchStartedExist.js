const Exception = require("../../Exception");

class ElectionResearchStartedExist extends Exception {
    constructor() {
		super("ELECTION_RESEARCH_STARTED_EXIST", 400, "Election research stated exist");
	} 
}

module.exports = ElectionResearchStartedExist;