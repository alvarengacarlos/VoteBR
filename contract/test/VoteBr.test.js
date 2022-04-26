// const chai = require("chai");
// const sinonChai = require("sinon-chai");
// chai.use(sinonChai);
// const expect = chai.expect;
// const {describe, beforeEach, it} = require("mocha");

// const { Context } = require("fabric-contract-api");
// const { ChaincodeStub } = require("fabric-shim");

// const VoteBr = require("../lib/VoteBr.js");

// describe("VoteBr", () => {
    
// 	let transactionContext, chaincodeStub;
    
// 	beforeEach(() => {
// 		transactionContext = new Context();

// 		chaincodeStub = sinonChai.createStubInstance(ChaincodeStub);
// 		transactionContext.setChaincodeStub(chaincodeStub);

// 		chaincodeStub.putState.callsFake((key, value) => {
// 			if (!chaincodeStub.states) {
// 				chaincodeStub.states = {};
// 			}
// 			chaincodeStub.states[key] = value;
// 		});

// 		chaincodeStub.getState.callsFake(async (key) => {
// 			let ret;
// 			if (chaincodeStub.states) {
// 				ret = chaincodeStub.states[key];
// 			}
// 			return Promise.resolve(ret);
// 		});

// 		chaincodeStub.getStateByRange.callsFake(async () => {
// 			function* internalGetStateByRange() {
// 				if (chaincodeStub.states) {
                    
// 					const copied = Object.assign({}, chaincodeStub.states);

// 					for (let key in copied) {
// 						yield {value: copied[key]};
// 					}
// 				}
// 			}

// 			return Promise.resolve(internalGetStateByRange());
// 		});
// 	});

// 	describe("#_candidateNumberExists", () => {
// 		it("Must return true", () => {
// 			const voteBr = new VoteBr();
// 			const response = voteBr._candidateNumberExist("1");

// 			expect(response).equal(true);
// 		});

// 		it("Must return false", () => {
// 			const voteBr = new VoteBr();
// 			const response = voteBr._candidateNumberExist("0");

// 			expect(response).equal(false);
// 		});
        
// 	});

// 	describe("#_cpfIsValid", () => {
        
// 		it("Must return true", () => {       
// 			const voteBr = new VoteBr();     
// 			const response = voteBr._cpfIsValid("01234567890");

// 			expect(response).equal(true);
// 		});

// 		it("Must return false", () => {
// 			const voteBr = new VoteBr();
// 			const response = voteBr._cpfIsValid("01234567809");

// 			expect(response).equal(false);
// 		});
        
// 	});    

// 	describe("#voteForCandidate", () => {
        
// 		it("Must compute one vote", () => {
// 			const voteBr = new VoteBr();
// 			voteBr.voteForCandidate("01234567890");            

// 		});
        
// 	});
// });