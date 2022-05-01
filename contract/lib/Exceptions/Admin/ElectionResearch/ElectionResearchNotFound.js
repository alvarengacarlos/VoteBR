const Exception = require("../../Exception");

class ElectionResearchNotFound extends Exception {
	constructor() {
		super("ELECTION_RESEARCH_NOT_FOUND", 404, "Election research not found");
	}
}

module.exports = ElectionResearchNotFound;