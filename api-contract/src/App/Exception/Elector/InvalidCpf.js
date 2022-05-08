const Exception = require("../Exception");

class InvalidCpf extends Exception {
	constructor() {
		super("INVALID_CPF", 400, "Cpf informed not valid");
	}    
}

module.exports = InvalidCpf;