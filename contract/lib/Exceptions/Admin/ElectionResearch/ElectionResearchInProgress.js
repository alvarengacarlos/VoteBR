const Exception = require("../../Exception");

class ElectionResearchInProgress extends Exception {
	constructor() {
		super("ELECTION_RESEARCH_IN_PROGRESS", 400, "There is already an election research in progress");
	}
}

module.exports = ElectionResearchInProgress;