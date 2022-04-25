const Exception = require("../Exception");

class ElectoralResearchWithoutStartingExist extends Exception {
    constructor() {
		super("ELECTORAL_RESEARCH_WITHOUT_STARTING_EXIST", 400, "Electoral research without starting exist");
	}
}

module.exports = ElectoralResearchWithoutStartingExist;