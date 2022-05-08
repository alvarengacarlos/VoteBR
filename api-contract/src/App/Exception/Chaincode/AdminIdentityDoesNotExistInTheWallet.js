const Exception = require("../Exception");

class AdminIdentityDoesNotExistInTheWallet extends Exception {
    constructor() {
		super("ADMIN_IDENTITY_DOES_NOT_EXISTS_IN_THE_WALLET", 500, "Admin identity does not exists in the wallet. Please login with admin from Certificate Authority");
	}
}

module.exports = AdminIdentityDoesNotExistInTheWallet;