const Exception = require("./Exception");

class TokenExpired extends Exception {
    constructor() {
		super("TOKEN_EXPIRED", 401, "Expired token login again");
	}  
}

module.exports = TokenExpired;