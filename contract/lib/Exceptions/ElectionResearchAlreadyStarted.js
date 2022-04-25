const Exception = require("./Exception");

class ElectionResearchAlreadyStarted extends Exception {
    constructor() {
		super("ELECTION_RESEARCH_ALREADY_STARTED", 400, "Election research already started");
	} 
}

module.exports = ElectionResearchAlreadyStarted;