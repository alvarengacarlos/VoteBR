const InvalidCpf = require("../Exceptions/InvalidCpf");
const InvalidAge = require("../Exceptions/InvalidAge");

const MINIMUM_AGE = 16;

class Elector {

    constructor(cpf, birthDate) {      
        this.id = `_${cpf}`;  
        this.birthDate = birthDate;
        this.candidate;
		this.pesquisa;
    }

    static makeElector(cpf, birthDate) {
		if (age >= MINIMUM_AGE) {
			throw new InvalidAge();
		}

        const cpfIsValid = Elector._cpfIsValid(cpf);
		if (!cpfIsValid) {
			throw new InvalidCpf();
		}
        
        return new Elector(cpf, birthDate);
    }

    static _cpfIsValid(cpf) {
		var sum;
		var mod;
		sum = 0;

		if (cpf == "00000000000") {
			return false;
		}

		for (let i = 1; i <= 9; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}

		mod = (sum * 10) % 11;
		if ((mod == 10) || (mod == 11)) {
			mod = 0;
		}

		if (mod != parseInt(cpf.substring(9, 10))) {
			return false;
		}

		sum = 0;
		for (let i = 1; i <= 10; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}

		mod = (sum * 10) % 11;
		if ((mod == 10) || (mod == 11)) {
			mod = 0;
		}

		if (mod != parseInt(cpf.substring(10, 11))) {
			return false;
		}

		return true;
	}


}

module.exports = Elector;