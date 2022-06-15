const { describe, beforeEach, it } = require("mocha");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { ctx, chaincodeStub, resetChaincodeStubState } = require("../mocks");

const ExistingRecord = require("../../../lib/Exceptions/ExistingRecord");
const NotExistingRecord = require("../../../lib/Exceptions/NotExistingRecord");

const ElectorRepository = require("../../../lib/Repository/ElectorRepository");
const Elector = require("../../../lib/Classes/Elector/Elector");
const ElectionResearch = require("../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../lib/Classes/Admin/Candidate");


describe("ElectorRepository", () => {

	beforeEach(() => {
		resetChaincodeStubState();
	});

	describe("#electorExists", () => {

		it("Must return true", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

			const electorRepository = new ElectorRepository();
			const response = await electorRepository.electorExists(ctx, elector.getId());

			expect(response).to.eql(true);
		});

		it("Must return false", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			const electorRepository = new ElectorRepository();
			const response = await electorRepository.electorExists(ctx, elector.getId());

			expect(response).to.eql(false);
		});

	});

	describe("#registerVote", () => {

		it("Must throw ExistingRecord", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

			const electorRepository = new ElectorRepository();
			await electorRepository.registerElector(ctx, elector)
				.should.be.rejectedWith(ExistingRecord);
		});

		it("Must register an elector", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			const electorRepository = new ElectorRepository();
			await electorRepository.registerElector(ctx, elector);

			const elBuffer = await chaincodeStub.getState(elector.getId());
			const el = JSON.parse(elBuffer.toString());

			expect(el).to.eql(elector);
		});

	});

	describe("#retrieveElector", () => {

		it("Must throw NotExistsRecord", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			const electorRepository = new ElectorRepository();
			await electorRepository.retrieveElector(ctx, elector)
				.should.be.rejectedWith(NotExistingRecord);
		});

		it("Must return an elector", async () => {
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(candidate);

			const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate, "secretPhrase");

			await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

			const electorRepository = new ElectorRepository();
			const elBuffer = await electorRepository.retrieveElector(ctx, elector);

			const el = JSON.parse(elBuffer.toString());

			expect(el).to.eql(elector);
		});

	});

});