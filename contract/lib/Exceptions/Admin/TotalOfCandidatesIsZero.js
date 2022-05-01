const Exception = require("../Exception");

class TotalOfCandidatesIsZero extends Exception {
	constructor() {
		super("TOTAL_OF_CANDIDATES_IS_ZERO", 400, "It is not possible to start an electoral research with zero candidates");
	}
}

module.exports = TotalOfCandidatesIsZero;