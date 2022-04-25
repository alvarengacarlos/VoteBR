const Exception = require("./Exception");

class ElectoralResearchWithoutStartingDoesNotExist extends Exception {
    constructor() {
		super("ELECTORAL_RESEARCH_WITHOUT_STARTING_DOES_NOT_EXIST", 404, "it was not possible to find an election survey without starting");
	} 
}

module.exports = ElectoralResearchWithoutStartingDoesNotExist;