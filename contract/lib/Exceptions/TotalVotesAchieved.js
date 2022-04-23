const Exception = require("./Exception");

class TotalVotesAchieved extends Exception {
	constructor() {
		super("TOTAL_VOTES_ACHIEVED", 500, "The established limit of votes received has been reached");
	}   
}

module.exports = TotalVotesAchieved;