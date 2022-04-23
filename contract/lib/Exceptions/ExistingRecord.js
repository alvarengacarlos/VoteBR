const Exception = require("../Exceptions/Exception");

class ExistingRecord extends Exception {
    constructor() {
		super("EXISTING_RECORD", 400, "This record already exists");
	}  
}

module.exports = ExistingRecord;