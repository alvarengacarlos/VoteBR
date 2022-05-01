const Exception = require("./Exception");

class AccessDenied extends Exception {
	constructor() {
		super("ACCESS_DENIED", 403, "Your credentials do not allow access");
	} 
}

module.exports = AccessDenied;