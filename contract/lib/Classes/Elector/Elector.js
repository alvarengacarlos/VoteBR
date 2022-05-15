const Serializer = require("../Serializer");
const IncorrectSecretPhrase = require("../../Exceptions/Elector/IncorrectSecretPhrase");

class Elector extends Serializer {

	constructor(cpf, electionResearchId, candidate, secretPhrase) {      
		super();
		this.id = `${electionResearchId}_${cpf}`;  
		this.candidate = candidate;
		this.secretPhrase = secretPhrase;
	}

	static makeElector(cpf, electionResearchId, candidate, secretPhrase) {
		const elector = new Elector(cpf, electionResearchId, candidate, secretPhrase);

		return elector;
	}

	static mountsElectorObjectRetrievedFromTheBlockchain(electorObject) {
		const elector = new Elector(null, null, null, null);

		elector.id = electorObject.id;
		elector.candidate = electorObject.candidate;
		elector.secretPhrase = electorObject.secretPhrase;

		return elector;
	}

	getId() {
		return this.id;
	}

	compareSecretPhraseAndThrowException(secretPhrase) {
		if (secretPhrase != this.secretPhrase) {
			throw new IncorrectSecretPhrase();
		}
	}
}

module.exports = Elector;