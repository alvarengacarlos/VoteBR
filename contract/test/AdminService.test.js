const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

const { Context } = require("fabric-contract-api");
const { ChaincodeStub } = require("fabric-shim");

const AdminService = require("../lib/Service/AdminService");

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

    describe("#createElectionResearch", () => {

        it("Must successfully execute the createElectionResearch method", async () => {
            const adminService = new AdminService();
            await adminService.createElectionResearch(transactionContext, "2000", "01");

            const eBuffer = await chaincodeStub.getState("2000-01");
            const e = JSON.parse(eBuffer.toString());

            expect(e).to.instanceOf(Object);
        });

    });
});
