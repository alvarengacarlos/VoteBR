const Exception = require("./Exception");

class AuthenticateFail extends Exception {
    constructor() {
		super("AUTH_FAIL", 401, "Incorrect email or password");
	}  
}

module.exports = AuthenticateFail;