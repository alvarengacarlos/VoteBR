const InvalidCpf = require("../../Exceptions/Elector/InvalidCpf");
const InvalidAge = require("../../Exceptions/Elector/InvalidAge");
const Serializer = require("../Serializer");

const MINIMUM_AGE = 16;

class Elector extends Serializer {

    constructor(cpf, birthDate, electionResearchId, candidate) {      
		super();
        this.id = `${electionResearchId}_${cpf}`;  
        this.birthDate = birthDate;
        this.candidate = candidate;
    }

    static makeElector(cpf, birthDate, electionResearch, candidate) {
		const electionResearchId = electionResearch.getId();

		const elector = new Elector(cpf, birthDate, electionResearchId, candidate);

		const age = birthDate.getAge();
		if (age < MINIMUM_AGE) {
			throw new InvalidAge();
		}

        const cpfIsValid = elector.cpfIsValid(cpf);
		if (cpfIsValid == false) {
			throw new InvalidCpf();
		}
        
        return elector;
    }

    cpfIsValid(cpf) {
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