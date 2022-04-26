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
const NotExistingRecord = require("../lib/Exceptions/NotExistingRecord");
const Candidate = require("../lib/Classes/Candidate");

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

    describe("AdminRepository", () => {

        describe("#electionResearchExists", () => {

			it("Must return true", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
                await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

				const adminRepository = new AdminRepository(); 
				const response = await adminRepository.electionResearchExists(transactionContext, electionResearch.getId());

				expect(response).to.eql(true);
			});

			it("Must return false", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

				const adminRepository = new AdminRepository(); 
				const response = await adminRepository.electionResearchExists(transactionContext, electionResearch.getId());

				expect(response).to.eql(false);
			});

		});

		describe("#createElectionResearch", () => {
            
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

		describe("#updateElectionResearch", () => {

			it("Must throw exception", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");                

				const adminRepository = new AdminRepository();                
				await adminRepository.updateElectionResearch(transactionContext, electionResearch).should.be.rejectedWith(NotExistingRecord);				
			});

			it("Must update an electoral research", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
                await chaincodeStub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());

				const eBuffer = await chaincodeStub.getState(electionResearch.getId());
				const eObject = JSON.parse(eBuffer.toString());

				e = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(eObject);
				e.start = true;

				const adminRepository = new AdminRepository();                
				await adminRepository.updateElectionResearch(transactionContext, e);
			});

		});

		describe("#_getAllResults", () => {

			it("Must return an array with election researches", async () => {
				
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01")
				const electionResearchBuffer = Buffer.from(JSON.stringify(electionResearch));
				
				const arrayOfElectionResearch = [
					{value: electionResearchBuffer}
				];

				function makeIterator(array) {
					let nextIndex = 0;

					return {
						next: async () => {
							return nextIndex < array.length ?
						 		{value: array[nextIndex++], done: false} :
						 		{done: true};
						},
						close: () => {
							return {done: true}
						}
					}
				}

				const iterator = makeIterator(arrayOfElectionResearch);

				const adminRepository = new AdminRepository();				
                const result = await adminRepository._getAllResults(iterator);				

				expect(result[0]).to.eql(electionResearch);
			});

		});

		describe("#_getQueryResultForQueryString", () => {

			it("Must return an array with election researches", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01")
				const electionResearchBuffer = Buffer.from(JSON.stringify(electionResearch));
				
				const arrayOfElectionResearch = [
					{value: electionResearchBuffer}
				];

				function makeIterator(array) {
					let nextIndex = 0;

					return {
						next: async () => {
							return nextIndex < array.length ?
						 		{value: array[nextIndex++], done: false} :
						 		{done: true};
						},
						close: () => {
							return {done: true}
						}
					}
				}

				const iterator = makeIterator(arrayOfElectionResearch)

				let queryString = {};
				queryString.selector = {};
				queryString.selector.start = false;
				queryString.selector.close = false; 

				chaincodeStub.getQueryResult.withArgs(JSON.stringify(queryString)).callsFake(() => iterator);				
							
				const adminRepository = new AdminRepository();				
                const result = await adminRepository._getQueryResultForQueryString(transactionContext, JSON.stringify(queryString));

				expect(result[0]).to.eql(electionResearch);
			});

		});

		describe("#retrieveElectionResearchWithoutStarting", () => {

			it("Must return an array with election researches without starting", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
				const electionResearchBuffer = Buffer.from(JSON.stringify(electionResearch));
				
				const arrayOfElectionResearch = [
					{value: electionResearchBuffer}
				];

				function makeIterator(array) {
					let nextIndex = 0;

					return {
						next: async () => {
							return nextIndex < array.length ?
						 		{value: array[nextIndex++], done: false} :
						 		{done: true};
						},
						close: () => {
							return {done: true}
						}
					}
				}

				const iterator = makeIterator(arrayOfElectionResearch)

				let queryString = {};
				queryString.selector = {};
				queryString.selector.start = false;
				queryString.selector.close = false; 

				chaincodeStub.getQueryResult.withArgs(JSON.stringify(queryString)).callsFake(() => iterator);

				const adminRepository = new AdminRepository();				
                const result = await adminRepository.retrieveElectionResearchWithoutStarting(transactionContext);
				
				expect(result[0]).to.eql(electionResearch);
			});
			
		});

		describe("#retrieveElectionResearchStarted", () => {

			it("Must return an array with election researches started", async () => {
				const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
				electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));
				electionResearch.beginCollectingVotes();				
				const electionResearchBuffer = Buffer.from(JSON.stringify(electionResearch));
				
				const arrayOfElectionResearch = [
					{value: electionResearchBuffer}
				];

				function makeIterator(array) {
					let nextIndex = 0;

					return {
						next: async () => {
							return nextIndex < array.length ?
						 		{value: array[nextIndex++], done: false} :
						 		{done: true};
						},
						close: () => {
							return {done: true}
						}
					}
				}

				const iterator = makeIterator(arrayOfElectionResearch)

				let queryString = {};
				queryString.selector = {};
				queryString.selector.start = true;
				queryString.selector.close = false; 

				chaincodeStub.getQueryResult.withArgs(JSON.stringify(queryString)).callsFake(() => iterator);

				const adminRepository = new AdminRepository();				
                const result = await adminRepository.retrieveElectionResearchStarted(transactionContext);
				
				expect(result[0]).to.eql(electionResearch);
			});

		});
    });
});