const Exception = require("./Exception");

class ResearchWithoutStartingDoesNotExist extends Exception {
    constructor() {
		super("RESEARCH_WITHOUT_STARTING_DOES_NOT_EXIST", 404, "it was not possible to find an election survey without starting");
	} 
}

module.exports = ResearchWithoutStartingDoesNotExist;