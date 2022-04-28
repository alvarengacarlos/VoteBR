const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { Context } = require("fabric-contract-api");
const { ChaincodeStub } = require("fabric-shim");

const ElectionResearchWithoutStartingExist = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchInProgress = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchNotFound = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

const ElectionResearch = require("../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../lib/Classes/Admin/Candidate");

const AdminService = require("../../../lib/Services/AdminService");
const AdminRepository = require("../../../lib/Repository/AdminRepository");


describe("AdminService", () => {
    
	let transactionContext, chaincodeStub;
    
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

	});

    describe("#createElectionResearch", () => {

        it("Must throw exception to ElectionResearchWithoutStartingExist", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const adminRepository = sinon.createStubInstance(AdminRepository);
			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => [electionResearch]);
			
			const adminService = new AdminService();
			await adminService.createElectionResearch(transactionContext, adminRepository, "2000", "01").should.be.rejectedWith(ElectionResearchWithoutStartingExist);
		});

		it("Must throw exception to ElectionResearchInProgress", async () => {			
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
			electionResearch.beginCollectingVotes();			
			
			const adminRepository = sinon.createStubInstance(AdminRepository);
			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => []);
			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => [electionResearch]);

			const adminService = new AdminService();
			await adminService.createElectionResearch(transactionContext, adminRepository, "2000", "01").should.be.rejectedWith(ElectionResearchInProgress);
			
		});
		
		it("Must successfully execute the createElectionResearch method", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);
            
			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => []);			
			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => []);

			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			adminRepository.createElectionResearch.withArgs(transactionContext, electionResearch)
				.callsFake(async () => await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer()));
			
			const adminService = new AdminService();
            await adminService.createElectionResearch(transactionContext, adminRepository, "2000", "01");

            const eBuffer = await chaincodeStub.getState("2000-01");			
            const e = JSON.parse(eBuffer.toString());

            expect(e).to.instanceOf(Object);
        });		
    });

	describe("#insertCandidateInTheElectionResearch", () => {
		
		it("Must throw exception to ElectionResearchNotFound", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
			electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
			electionResearch.beginCollectingVotes();			
			
			const adminRepository = sinon.createStubInstance(AdminRepository);
			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => []);

			const adminService = new AdminService();
			await adminService.insertCandidateInTheElectionResearch(transactionContext, adminRepository, "Fulano", "01").should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must successfully execute the insertCandidateInTheElectionResearch method", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");			

			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => []);
			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => [electionResearch]);
			adminRepository.updateElectionResearch.withArgs(transactionContext, electionResearch).callsFake(async () => {
				await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
			});
			
			const adminService = new AdminService();
			await adminService.insertCandidateInTheElectionResearch(transactionContext, adminRepository, "Fulano", "01");
			
			const eBuffer = await chaincodeStub.getState(electionResearch.getId());
			const e = JSON.parse(eBuffer.toString());
			
			expect(e).to.eql(electionResearch);
		});
	});

	describe("#beginCollectingVotes", () => {

		it("Must throw exception to ElectionResearchNotFound", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);

			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => []);
			
			const adminService = new AdminService();
			await adminService.beginCollectingVotes(transactionContext, adminRepository)
				.should.be.rejectedWith(ElectionResearchNotFound);			
		});

		it("Must successfully execute beginCollectingVotes", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
			
			const candidate = Candidate.makeCandidate("Fulano", "01");
			
			electionResearch.insertCandidate(candidate);

			adminRepository.retrieveElectionResearchWithoutStarting.withArgs(transactionContext).callsFake(() => [electionResearch]);
			
			const adminService = new AdminService();
			await adminService.beginCollectingVotes(transactionContext, adminRepository);
		});

	});

	describe("#finishElectionResearch", () => {
		
		it("Must throw exception for ElectionResearchNotFound", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);

			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => []);
			
			const adminService = new AdminService();
			await adminService.finishElectionResearch(transactionContext, adminRepository).should.be.rejectedWith(ElectionResearchNotFound);
		});

		it("Must successfully execute finishElectionResearch", async () => {
			const adminRepository = sinon.createStubInstance(AdminRepository);
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

			const candidate = Candidate.makeCandidate("Fulano", "01");
			
			electionResearch.insertCandidate(candidate);
			electionResearch.beginCollectingVotes();

			adminRepository.retrieveElectionResearchInProgress.withArgs(transactionContext).callsFake(() => [electionResearch]);

			const adminService = new AdminService();
			await adminService.finishElectionResearch(transactionContext, adminRepository);

			expect().to.eql();
		});

	});

});
