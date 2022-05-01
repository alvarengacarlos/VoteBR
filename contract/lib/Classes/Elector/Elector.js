const Serializer = require("../Serializer");

class Elector extends Serializer {

	constructor(cpf, electionResearchId, candidate) {      
		super();
		this.id = `${electionResearchId}_${cpf}`;  
		this.candidate = candidate;
	}

	static makeElector(cpf, electionResearchId, candidate) {
		const elector = new Elector(cpf, electionResearchId, candidate);

		return elector;
	}

	static mountsElectorObjectRetrievedFromTheBlockchain(electorObject) {
		const elector = new Elector(null, null, null);

		elector.id = electorObject.id;
		elector.candidate = electorObject.candidate;

		return elector;
	}

	getId() {
		return this.id;
	}
}

module.exports = Elector;