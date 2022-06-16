const { describe, beforeEach, it } = require("mocha");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { ctx, chaincodeStub, resetChaincodeStubState, makeIterator } = require("../mocks");

const ExistingRecord = require("../../../lib/Exceptions/ExistingRecord");
const NotExistingRecord = require("../../../lib/Exceptions/NotExistingRecord");

const ElectionResearchRepository = require("../../../lib/Repository/ElectionResearchRepository");
const ElectionResearch = require("../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../lib/Classes/Admin/Candidate");

describe("ElectionResearchRepository", () => {

	beforeEach(() => {
		resetChaincodeStubState();
	});

	describe("#electionResearchExists", () => {

		it("Must return true", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

			const electionResearchRepository = new ElectionResearchRepository();
			const response = await electionResearchRepository.electionResearchExists(ctx, electionResearch.getId());

			expect(response).to.eql(true);
		});

		it("Must return false", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const electionResearchRepository = new ElectionResearchRepository();
			const response = await electionResearchRepository.electionResearchExists(ctx, electionResearch.getId());

			expect(response).to.eql(false);
		});

	});

	describe("#createElectionResearch", () => {

		it("Must throw an error for existing electoral research", async () => {
			const electionResearch1 = ElectionResearch.makeElectionResearch("2000", "01");
			await chaincodeStub.putState(electionResearch1.getId(), electionResearch1.serializerInBuffer());

			const electionResearch2 = ElectionResearch.makeElectionResearch("2000", "01");
			const electionResearchRepository = new ElectionResearchRepository();

			await electionResearchRepository.createElectionResearch(ctx, electionResearch2).should.be.rejectedWith(ExistingRecord);
		});

		it("Must success in creating election research", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const electionResearchRepository = new ElectionResearchRepository();

			await electionResearchRepository.createElectionResearch(ctx, electionResearch);

			const eBuffer = await chaincodeStub.getState(electionResearch.getId());
			const e = JSON.parse(eBuffer.toString());

			expect(e).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearch", () => {

		it("Must throw NotExistsRecord exception", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const electionResearchRepository = new ElectionResearchRepository();
			await electionResearchRepository.retrieveElectionResearch(ctx, electionResearch)
				.should.be.rejectedWith(NotExistingRecord);
		});

		it("Must return an electionResearch", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

			const electionResearchRepository = new ElectionResearchRepository();
			const elBuffer = await electionResearchRepository.retrieveElectionResearch(ctx, electionResearch);
			const el = JSON.parse(elBuffer.toString());

			expect(el).to.eql(electionResearch);
		});

	});

	describe("#updateElectionResearch", () => {

		it("Must throw exception", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const electionResearchRepository = new ElectionResearchRepository();
			await electionResearchRepository.updateElectionResearch(ctx, electionResearch).should.be.rejectedWith(NotExistingRecord);
		});

		it("Must update an electoral research", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

			const eBuffer = await chaincodeStub.getState(electionResearch.getId());
			const eObject = JSON.parse(eBuffer.toString());

			let e = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(eObject);
			e.start = true;

			const electionResearchRepository = new ElectionResearchRepository();
			await electionResearchRepository.updateElectionResearch(ctx, e);
		});

	});

	describe("#_getAllResults", () => {

		it("Must return an array with election researches", async () => {

			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const iterator = makeIterator([{ value: electionResearch.serializerInBuffer() }]);

			const electionResearchRepository = new ElectionResearchRepository();
			const result = await electionResearchRepository._getAllResults(iterator);

			expect(result[0]).to.eql(electionResearch);
		});

	});

	describe("#_getQueryResultForQueryString", () => {

		it("Must return an array with election researches", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const iterator = makeIterator([{ value: electionResearch.serializerInBuffer() }]);

			let queryString = {};
			queryString.selector = {};
			queryString.selector.start = false;
			queryString.selector.close = false;

			chaincodeStub.getQueryResult
				.withArgs(JSON.stringify(queryString))
				.callsFake(() => iterator);

			const electionResearchRepository = new ElectionResearchRepository();
			const result = await electionResearchRepository._getQueryResultForQueryString(ctx, JSON.stringify(queryString));

			expect(result[0]).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearchWithoutStarting", () => {

		it("Must return an array with election researches without starting", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const iterator = makeIterator([{ value: electionResearch.serializerInBuffer() }]);

			let queryString = {};
			queryString.selector = {};
			queryString.selector.isStart = false;
			queryString.selector.isClose = false;

			chaincodeStub.getQueryResult
				.withArgs(JSON.stringify(queryString))
				.callsFake(() => iterator);

			const electionResearchRepository = new ElectionResearchRepository();
			const result = await electionResearchRepository.retrieveElectionResearchWithoutStarting(ctx);

			expect(result[0]).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearchInProgress", () => {

		it("Must return an array with election researches started", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01", "https://image.com.br"));
			electionResearch.beginCollectingVotes();

			const iterator = makeIterator([{ value: electionResearch.serializerInBuffer() }]);

			let queryString = {};
			queryString.selector = {};
			queryString.selector.isStart = true;
			queryString.selector.isClose = false;

			chaincodeStub.getQueryResult
				.withArgs(JSON.stringify(queryString))
				.callsFake(() => iterator);

			const electionResearchRepository = new ElectionResearchRepository();
			const result = await electionResearchRepository.retrieveElectionResearchInProgress(ctx);

			expect(result[0]).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearchClosed", () => {

		it("Must return an array with election researches closed", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();
			electionResearch.finishElectionResearch();

			const iterator = makeIterator([{ value: electionResearch.serializerInBuffer() }]);

			let queryString = {};
			queryString.selector = {};
			queryString.selector.isStart = true;
			queryString.selector.isClose = true;

			chaincodeStub.getQueryResult
				.withArgs(JSON.stringify(queryString))
				.callsFake(() => iterator);

			const electionResearchRepository = new ElectionResearchRepository();
			const result = await electionResearchRepository.retrieveElectionResearchClosed(ctx);

			expect(result[0]).to.eql(electionResearch);
		});

	});
	
});