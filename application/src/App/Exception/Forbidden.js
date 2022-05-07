const Exception = require("./Exception");

class Forbidden extends Exception {
    constructor() {
		super("FORBIDDEN", 403, `You do not have access`);
	}  
}

module.exports = Forbidden;