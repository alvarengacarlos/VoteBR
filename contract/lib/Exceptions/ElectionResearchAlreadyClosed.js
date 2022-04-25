const Exception = require("./Exception");

class ElectionResearchAlreadyClosed extends Exception {
    constructor() {
		super("ELECTION_RESEARCH_ALREADY_CLOSED", 400, "Election research already closed");
	} 
}

module.exports = ElectionResearchAlreadyClosed;