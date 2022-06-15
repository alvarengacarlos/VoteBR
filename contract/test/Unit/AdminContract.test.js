const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const {ctx, chaincodeStub, resetChaincodeStubState} = require("./mocks");
const ElectionResearchRepository = require("../../lib/Repository/ElectionResearchRepository");

const ElectionResearchWithoutStartingExist = require("../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchInProgress = require("../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchNotFound = require("../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

const ElectionResearch = require("../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../lib/Classes/Admin/Candidate");
const AdminContract = require("../../lib/AdminContract");

describe("AdminContract", () => {

	let repository, adminContract;

	beforeEach(() => {
		repository = sinon.createStubInstance(ElectionResearchRepository);
		adminContract = new AdminContract();
		adminContract.repository = repository;

		resetChaincodeStubState();
	});

	describe("#createElectionResearch", () => {

		it("Must throw exception to ElectionResearchWithoutStartingExist", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
			
            await adminContract.createElectionResearch(ctx, "2000", "01")
				.should.be.rejectedWith(ElectionResearchWithoutStartingExist);
		});

		it("Must throw exception to ElectionResearchInProgress", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
			electionResearch.beginCollectingVotes();			
			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => []);
			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);

			await adminContract.createElectionResearch(ctx, "2000", "01")
				.should.be.rejectedWith(ElectionResearchInProgress);
		});
		
		it("Must successfully execute the createElectionResearch method", async () => {
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => []);			
			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => []);

			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			adminContract.repository.createElectionResearch
				.callsFake(async () => {
					await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
				});
			
			await adminContract.createElectionResearch(ctx, "2000", "01");

			const electionResearchBuffer = await chaincodeStub.getState("2000-01");			
			const electionResearchObject = JSON.parse(electionResearchBuffer.toString());

			expect(electionResearchObject).to.eql(electionResearch);
		});	

	});

	describe("#insertCandidateInTheElectionResearch", () => {
		
		it("Must throw exception to ElectionResearchNotFound", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
			electionResearch.beginCollectingVotes();			
			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => []);
			
			await adminContract.insertCandidateInTheElectionResearch(ctx, "Fulano de Tal", "01", "https://www.image.com")
				.should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must successfully execute the insertCandidateInTheElectionResearch method", async () => {
			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");			

			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => []);			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
			
			adminContract.repository.updateElectionResearch
				.callsFake(async () => {				
				    await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			    });
			
			await adminContract.insertCandidateInTheElectionResearch(ctx, "Fulano", "01", "https://www.image.com");
			
			const electionResearchBuffer = await chaincodeStub.getState(electionResearch.getId());
			const electionResearchObject = JSON.parse(electionResearchBuffer.toString());
			
			expect(electionResearchObject.candidatesList.length).to.eql(1);
		});
	});

	describe("#removeCandidateOfElectionResearch", () => {

		it("Must throw exception to ElectionResearchNotFound", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
			electionResearch.beginCollectingVotes();			
			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => []);

			await adminContract.removeCandidateOfElectionResearch(ctx, "01")
				.should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must successfully execute the removeCandidateOfElectionResearch method", async () => {
			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");			
			const candidate = Candidate.makeCandidate("Fulano", "01");
			electionResearch.insertCandidate(candidate);

			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => []);			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
			
			adminContract.repository.updateElectionResearch
				.callsFake(async () => {				
				    await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			    });
			
			await adminContract.removeCandidateOfElectionResearch(ctx, "01");
			
			const electionResearchBuffer = await chaincodeStub.getState(electionResearch.getId());
			const electionResearchObject = JSON.parse(electionResearchBuffer.toString());
			
			expect(electionResearchObject.candidatesList.length).to.eql(0);
		});

	});

	describe("#beginCollectingVotes", () => {

		it("Must throw exception to ElectionResearchNotFound", async () => {			
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => []);
			
			await adminContract.beginCollectingVotes(ctx)
				.should.be.rejectedWith(ElectionResearchNotFound);			
		});

		it("Must successfully execute beginCollectingVotes", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
			
			const candidate = Candidate.makeCandidate("Fulano", "01");
			
			electionResearch.insertCandidate(candidate);

			adminContract.repository.retrieveElectionResearchWithoutStarting
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
			adminContract.repository.updateElectionResearch
				.callsFake(async () => {
				    electionResearch.beginCollectingVotes();
				    await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			    });

			await adminContract.beginCollectingVotes(ctx);

			const electionResearchBuffer = await chaincodeStub.getState(electionResearch.getId());
			const electionResearchObject = JSON.parse(electionResearchBuffer.toString());

			expect(electionResearchObject.isStart).to.eql(true);
			expect(electionResearchObject.totalOfVotes).to.eql(0);
			expect(electionResearchObject.isClose).to.eql(false);
		});

	});

	describe("#finishElectionResearchAndCollectingVotes", () => {
		
		it("Must throw exception for ElectionResearchNotFound", async () => {
			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => []);
			
			await adminContract.finishElectionResearchAndCollectingVotes(ctx)
				.should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must successfully execute finishElectionResearchAndCollectingVotes", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const candidate = Candidate.makeCandidate("Fulano", "01");
			
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			adminContract.repository.retrieveElectionResearchInProgress
				.withArgs(ctx)
				.callsFake(() => [electionResearch]);
			adminContract.repository.updateElectionResearch
				.callsFake(async () => {
				    electionResearch.finishElectionResearch();
				    await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			    });
            
			await adminContract.finishElectionResearchAndCollectingVotes(ctx);

			const electionResearchBuffer = await chaincodeStub.getState(electionResearch.getId());
			const electionResearchObject = JSON.parse(electionResearchBuffer.toString());

			expect(electionResearchObject.isStart).to.eql(true);
			expect(electionResearchObject.totalOfVotes).to.eql(0);
			expect(electionResearchObject.isClose).to.eql(true);			
		});

	});

	describe("#retrieveElectionResearch", () => {

		it("Must return an election research", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
                        
			await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

			adminContract.repository.retrieveElectionResearch
				.callsFake(async () => {
				    return (await chaincodeStub.getState(electionResearch.getId()));
			    });

			const electionResearchObject = await adminContract.retrieveElectionResearch(ctx, "2000", "01");

			expect(electionResearchObject).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearchWithoutStarting", () => {

		it("Must return election research list without starting", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
			adminContract.repository.retrieveElectionResearchWithoutStarting
				.callsFake(async () => {
				    return [electionResearch];
			    });

			const electionList = await adminContract.retrieveElectionResearchWithoutStarting(ctx);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});

	describe("#retrieveElectionResearchInProgress", () => {

		it("Must return an election research in progress", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			adminContract.repository.retrieveElectionResearchInProgress
				.callsFake(async () => {
				    return [electionResearch];
			    });

			const electionList = await adminContract.retrieveElectionResearchInProgress(ctx);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});


	describe("#retrieveElectionResearchClosed", () => {

		it("Must return an election research closed", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			const candidate = Candidate.makeCandidate("Fulano", "01");
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();
			electionResearch.finishElectionResearch();
			
			adminContract.repository.retrieveElectionResearchClosed
				.callsFake(async () => {
				    return [electionResearch];
    			});

			const electionList = await adminContract.retrieveElectionResearchClosed(ctx);

			expect(electionList[0]).to.eql(electionResearch);
		});

	});

});