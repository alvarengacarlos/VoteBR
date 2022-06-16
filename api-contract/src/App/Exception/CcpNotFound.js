const Exception = require("./Exception");

class CcpNotFound extends Exception {
    constructor() {
		super("CCP_NOT_FOUND", 500, `The ccp.json file not found.`);
	}  
}

module.exports = CcpNotFound;