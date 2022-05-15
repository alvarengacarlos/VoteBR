const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");

const expect = chai.expect;

const Elector = require("../../../../lib/Classes/Elector/Elector");
const ElectionResearch = require("../../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../../lib/Classes/Admin/Candidate");
const IncorrectSecretPhrase = require("../../../../lib/Exceptions/Elector/IncorrectSecretPhrase");

describe("Elector", () => {

	let electionResearch, candidate;

	beforeEach(() => {
		electionResearch = ElectionResearch.makeElectionResearch("2022", "01");
		candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
	});

	describe("#makeElector", () => {

		it("Must return an Elector instance", () => {
			const elector = Elector.makeElector("01234567890", electionResearch, candidate, "secretPhrase");

			expect(elector).to.be.an.instanceOf(Elector);
		});

	});    

	describe("#mountsElectorObjectRetrievedFromTheBlockchain", () => {

		it("Must return elector object", () => {
			const elector = Elector.makeElector("01234567890", electionResearch, candidate, "secretPhrase");

			const e = Elector.mountsElectorObjectRetrievedFromTheBlockchain(elector);
            
			expect(e).to.eql(elector);
		});

	});

	describe("#compareSecretPhraseThrowException", () => {

		it("Must throw IncorrectSecretPhrase exception", () => {
			const elector = Elector.makeElector("01234567890", electionResearch, candidate, "secretPhrase");

			expect(
				() => elector.compareSecretPhraseAndThrowException("incorrect")
			).to.throw(IncorrectSecretPhrase);
		});

		it("Must not throw IncorrectSecretPhrase exception", () => {
			const elector = Elector.makeElector("01234567890", electionResearch, candidate, "secretPhrase");

			expect(
				() => elector.compareSecretPhraseAndThrowException("secretPhrase")
			).to.not.throw(IncorrectSecretPhrase);
		});

	});

});