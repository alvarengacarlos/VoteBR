const Exception = require("../../Exception");

class UninitiatedElectionResearch extends Exception {
	constructor() {
		super("UNINITIATED_ELECTION_RESEARCH", 400, "The electoral research has not been started");
	}  
}

module.exports = UninitiatedElectionResearch;