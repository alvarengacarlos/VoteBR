const Exception = require("../../Exception");

class ElectionResearchClosed extends Exception {
	constructor() {
		super("ELECTION_RESEARCH_CLOSED", 400, "Election research already closed");
	}
}

module.exports = ElectionResearchClosed;