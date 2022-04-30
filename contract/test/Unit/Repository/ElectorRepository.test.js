const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { Context } = require("fabric-contract-api");
const { ChaincodeStub } = require("fabric-shim");

const ExistingRecord = require("../../../lib/Exceptions/ExistingRecord");
const NotExistingRecord = require("../../../lib/Exceptions/NotExistingRecord");

const ElectorRepository = require("../../../lib/Repository/ElectorRepository");
const Elector = require("../../../lib/Classes/Elector/Elector");
const ElectionResearch = require("../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../lib/Classes/Admin/Candidate");


describe("AdminRepository", () => {
    
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

    describe("#electorExists", () => {

        it("Must return true", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate);            
            
            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);
            
            await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

            const electorRepository = new ElectorRepository(); 
            const response = await electorRepository.electorExists(transactionContext, elector.getId());

            expect(response).to.eql(true);
        });

        it("Must return false", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate); 

            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);

            const electorRepository = new ElectorRepository(); 
            const response = await electorRepository.electorExists(transactionContext, elector.getId());

            expect(response).to.eql(false);
        });

    });

    describe("#registerVote", () => {

        it("Must throw ExistingRecord", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate);            
            
            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);
            
            await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

            const electorRepository = new ElectorRepository(); 
            await electorRepository.registerElector(transactionContext, elector)
                .should.be.rejectedWith(ExistingRecord);
        });

        it("Must register an elector", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate);            
            
            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);

            const electorRepository = new ElectorRepository(); 
            await electorRepository.registerElector(transactionContext, elector);

            const elBuffer = await chaincodeStub.getState(elector.getId());
            const el = JSON.parse(elBuffer.toString());

            expect(el).to.eql(elector);
        });

    });

    describe("#retrieveElector", () => {

        it("Must throw NotExistsRecord", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate); 

            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);

            const electorRepository = new ElectorRepository(); 
            await electorRepository.retrieveElector(transactionContext, elector)
                .should.be.rejectedWith(NotExistingRecord);
        });

        it("Must return an elector", async () => {
            const candidate = Candidate.makeCandidate("Fulano", "01");
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(candidate);            
            
            const elector = Elector.makeElector("01234567890", electionResearch.getId(), candidate);
            
            await chaincodeStub.putState(elector.getId(), elector.serializerInBuffer());

            const electorRepository = new ElectorRepository(); 
            const elBuffer = await electorRepository.retrieveElector(transactionContext, elector);
                   
            const el = JSON.parse(elBuffer.toString());

            expect(el).to.eql(elector);
        });

    });

});