const Exception = require("./Exception");

class CpfDoesNotExists extends Exception {
	constructor() {
		super("CPF_DOES_NOT_EXIST", 404, "Informed cpf does not exist");
	}  
}

module.exports = CpfDoesNotExists;