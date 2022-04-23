const Exception = require("./Exception");

class CpfDoesNotExists extends Exception {
	constructor() {
		super("CPF_DOES_NOT_EXIST", 400, "Informed cpf does not exist");
	}  
}

module.exports = CpfDoesNotExists;