const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const {ctx, chaincodeStub, resetChaincodeStubState} = require("./mocks");

const ElectionResearchNotFound = require("../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");
const TotalVotesAchieved = require("../../lib/Exceptions/Elector/TotalVotesAchieved");

const ElectorRepository = require("../../lib/Repository/ElectorRepository");
const ElectionResearchRepository = require("../../lib/Repository/ElectionResearchRepository");

const ElectionResearch = require("../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../lib/Classes/Admin/Candidate");
const Elector = require("../../lib/Classes/Elector/Elector");

const ElectorContract = require("../../lib/ElectorContract");

describe("ElectorContract", () => {
    
	let cpfHashing = "1234567abcdefg";	
	let electorContract;

	beforeEach(() => {
		const electionResearchRepository = sinon.createStubInstance(ElectionResearchRepository);
		const electorRepository = sinon.createStubInstance(ElectorRepository);

		electorContract = new ElectorContract();
		electorContract.repository = electorRepository;
		electorContract.electionResearchRepository = electionResearchRepository;

		resetChaincodeStubState();
	});

	describe("#Vote", () => {

		it("Must throw ElectionResearchNotFound exception", async () => {            
			electorContract.electionResearchRepository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => []);

			await electorContract.vote(ctx, cpfHashing, "01", "secretPhrase")
				.should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must throw TotalVotesAchieved", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "02");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01", "https://image.com.br"));
			electionResearch.beginCollectingVotes();
			electionResearch.addOneVote();
                        
			electorContract.electionResearchRepository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);

			electorContract.VOTE_LIMIT = 0;
			await electorContract.vote(ctx, cpfHashing, "01", "secretPhrase")
				.should.be.rejectedWith(TotalVotesAchieved);
		});

		it("Must register the elector vote", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "02");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			electorContract.electionResearchRepository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
            
			electorContract.electionResearchRepository.updateElectionResearch.callsFake(async () => {              
				electionResearch.addOneVote();
				await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			});

			const elector = Elector.makeElector(cpfHashing, electionResearch.getId(), candidate, "secretePhrase");

			electorContract.repository.registerElector
				.callsFake(async () => {
				    await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());
			    });
            
			await electorContract.vote(ctx, cpfHashing, "01", "secretPhrase");

			const electionResearchBuffer = await chaincodeStub.getState(electionResearch.getId());
			const electorBuffer = await chaincodeStub.getState(elector.getId());
                        
			expect(
				JSON.parse(electionResearchBuffer.toString()).totalOfVotes
			).to.eql(1);
            
			expect(
				JSON.parse(electorBuffer.toString())
			).to.eql(elector);
		});

	});

	describe("#searchElector", () => {

		it("Must return an elector", async () => {
			const election = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			const elector = Elector.makeElector(cpfHashing, election.getId(), candidate, "secretPhrase");
            
			await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

			electorContract.repository.retrieveElector
				.callsFake(async () => {
				    return await chaincodeStub.getState(elector.getId());
			    });

			const electorObject = await electorContract.searchElector(ctx, "2000", "01", cpfHashing, "secretPhrase");

			expect(electorObject).to.eql(elector);
		});

	});

	describe("#searchElectionResearchInProgress", () => {

		it("Must return an election research in progress", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			electorContract.electionResearchRepository.retrieveElectionResearchInProgress
				.callsFake(async () => {
				    return [electionResearch];
			    });

			const electionList = await electorContract.searchElectionResearchInProgress(ctx);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});


	describe("#searchElectionResearchClosed", () => {

		it("Must return an election research closed", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();
			electionResearch.finishElectionResearch();
			
			electorContract.electionResearchRepository.retrieveElectionResearchClosed
				.callsFake(async () => {
				    return [electionResearch];
			    });

			const electionList = await electorContract.searchElectionResearchClosed(ctx);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});

});