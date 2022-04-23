class Exception extends Error {
    
	constructor(internalCode, httpStatusCode, message) {
		super(message);
		this.internalCode = internalCode;
		this.httpStatusCode = Number(httpStatusCode);        
	}

}

module.exports = Exception;