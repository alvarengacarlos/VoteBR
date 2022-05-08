const Exception = require("../Exception");

class CpfDoesNotExist extends Exception {
	constructor() {
		super("CPF_DOES_NOT_EXIST", 404, "Informed cpf does not exist");
	}  
}

module.exports = CpfDoesNotExist;