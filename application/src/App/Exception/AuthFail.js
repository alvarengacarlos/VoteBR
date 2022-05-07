const Exception = require("./Exception");

class AuthFail extends Exception {
    constructor() {
		super("AUTH_FAIL", 401, "Incorrect email or password");
	}  
}

module.exports = AuthFail;