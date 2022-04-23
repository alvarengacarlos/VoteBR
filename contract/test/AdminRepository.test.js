const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

const { Context } = require("fabric-contract-api");
const { ChaincodeStub } = require("fabric-shim");

const AdminRepository = require("../lib/Repository/AdminRepository");
const ElectionResearch = require("../lib/Classes/ElectionResearch");
const ExistingRecord = require("../lib/Exceptions/ExistingRecord");

describe("VoteBr", () => {
    
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

		chaincodeStub.getStateByRange.callsFake(async () => {
			function* internalGetStateByRange() {
				if (chaincodeStub.states) {
                    
					const copied = Object.assign({}, chaincodeStub.states);

					for (let key in copied) {
						yield {value: copied[key]};
					}
				}
			}

			return Promise.resolve(internalGetStateByRange());
		});
	});

    describe("AdminRepository", () => {

        describe("#electionResearchExists", () => {
            
            it("Must throw an error for existing electoral research", async () => {
                const electionResearch1 = ElectionResearch.makeElectionResearch("2000", "01");
                await chaincodeStub.putState(electionResearch1.getId(), electionResearch1.serializerInBuffer());

                const electionResearch2 = ElectionResearch.makeElectionResearch("2000", "01");
                const adminRepository = new AdminRepository();                
                                
                await adminRepository.createElectionResearch(transactionContext, electionResearch2).should.be.rejectedWith(ExistingRecord);                
            });

            it("Must success in creating election research", async () => {
                const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
                const adminRepository = new AdminRepository();                
                
                await adminRepository.createElectionResearch(transactionContext, electionResearch);
                
                const eBuffer = await chaincodeStub.getState(electionResearch.getId());
                const e = JSON.parse(eBuffer.toString());
                
                expect(e).to.eql(electionResearch);
            });

        });

    });
});