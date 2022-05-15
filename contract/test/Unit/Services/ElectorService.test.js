const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { Context } = require("fabric-contract-api");
const { ChaincodeStub } = require("fabric-shim");

const ElectionResearchNotFound = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");
const TotalVotesAchieved = require("../../../lib/Exceptions/Elector/TotalVotesAchieved");

const ElectorService = require("../../../lib/Services/ElectorService");
const ElectorRepository = require("../../../lib/Repository/ElectorRepository");
const AdminRepository = require("../../../lib/Repository/AdminRepository");
const ElectionResearch = require("../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../lib/Classes/Admin/Candidate");
const Elector = require("../../../lib/Classes/Elector/Elector");

describe("ElectorServive", () => {

	let transactionContext, chaincodeStub;
	let cpf = "01234567890";
	let adminRepository;
	let electorRepository;

	beforeEach(() => {
		transactionContext = new Context();
        
		chaincodeStub = sinon.createStubInstance(ChaincodeStub);
		transactionContext.setChaincodeStub(chaincodeStub);

		chaincodeStub.putState.callsFake((key, value) => {
			if (!chaincodeStub.states) {                
				chaincodeStub.states = {};
			}
			chaincodeStub.states[key] = value;
		});

		chaincodeStub.getState.callsFake(async (key) => {
			let ret;
			if (chaincodeStub.states) {
				ret = chaincodeStub.states[key];
			}
			return Promise.resolve(ret);
		});

		adminRepository = sinon.createStubInstance(AdminRepository);
		electorRepository = sinon.createStubInstance(ElectorRepository);
	});

	describe("#Vote", () => {

		it("Must throw ElectionResearchNotFound exception", async () => {            
			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => []);

			const electorService = new ElectorService();            
			electorService.adminRepository = adminRepository;

			await electorService.vote(transactionContext, cpf, "01", "secretPhrase")
				.should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must throw TotalVotesAchieved", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "02");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01", "https://image.com.br"));
			electionResearch.beginCollectingVotes();
			electionResearch.addOneVote();
            
			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => [electionResearch]);

			const electorService = new ElectorService();
			electorService.VOTE_LIMIT = 0;                        
			electorService.adminRepository = adminRepository;

			await electorService.vote(transactionContext, "01", "secretPhrase")
				.should.be.rejectedWith(TotalVotesAchieved);
		});

		it("Must register the elector vote", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "02");
			const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => [electionResearch]);
            
			adminRepository.updateElectionResearch.callsFake(async () => {              
				electionResearch.addOneVote();
				await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			});

			const elector = Elector.makeElector(cpf, electionResearch.getId(), candidate, "secretePhrase");

			electorRepository.registerElector.callsFake(async () => {
				await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());
			});
            
			const electorService = new ElectorService();
			electorService.VOTE_LIMIT = 10;                        
			electorService.adminRepository = adminRepository;
			electorService.electorRepository = electorRepository;
            
			await electorService.vote(transactionContext, cpf, "01", "secretPhrase");

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
			const elector = Elector.makeElector(cpf, election.getId(), candidate, "secretPhrase");
            
			await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

			electorRepository.retrieveElector.callsFake(async () => {
				return await chaincodeStub.getState(elector.getId());
			});

			const electorService = new ElectorService();
			electorService.VOTE_LIMIT = 10;                                    
			electorService.electorRepository = electorRepository;

			const electorObject = await electorService.searchElector(transactionContext, "2000", "01", cpf, "secretPhrase");

			expect(electorObject).to.eql(elector);
		});

	});

	describe("#searchElectionResearchInProgress", () => {

		it("Must return an election research in progress", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            const candidate = Candidate.makeCandidate("Fulano", "01", "https://image.com.br");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			adminRepository.retrieveElectionResearchInProgress.callsFake(async () => {
				return [electionResearch];
			});

			const electorService = new ElectorService();
			electorService.VOTE_LIMIT = 10;                                    
			electorService.adminRepository = adminRepository;

			const electionList = await electorService.searchElectionResearchInProgress(transactionContext);

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
			
			adminRepository.retrieveElectionResearchClosed.callsFake(async () => {
				return [electionResearch];
			});

			const electorService = new ElectorService();
			electorService.VOTE_LIMIT = 10;                                    
			electorService.adminRepository = adminRepository;

			const electionList = await electorService.searchElectionResearchClosed(transactionContext);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});

});