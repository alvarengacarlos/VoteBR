const Exception = require("./Exception");

class NotExistingRecord extends Exception {
    constructor() {
		super("NOT_EXISTING_RECORD", 404, "This record not exists");
	}  
}

module.exports = NotExistingRecord;