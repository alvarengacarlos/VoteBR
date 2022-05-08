const Exception = require("../Exception");

class IdentityAlreadyExists extends Exception {
    constructor() {
		super("IDENTITY_ALREADY_EXISTS", 500, "Idenity already exists in Certificate Authority and wallet");
	}  
}

module.exports = IdentityAlreadyExists;