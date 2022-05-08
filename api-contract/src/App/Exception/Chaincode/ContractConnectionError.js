const Exception = require("./Exception");

class ContractConnectionError extends Exception {
    constructor() {
		super("CONTRACT_CONNECTION_ERROR", 500, "Sorry it was not possible to link to the contract");
	}  
}

module.exports = ContractConnectionError;