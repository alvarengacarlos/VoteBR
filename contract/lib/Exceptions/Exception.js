class Exception extends Error {
    
	constructor(internalCode, httpStatusCode, message) {
		super(`${internalCode}:${httpStatusCode}:${message}`);		 
	}

}

module.exports = Exception;