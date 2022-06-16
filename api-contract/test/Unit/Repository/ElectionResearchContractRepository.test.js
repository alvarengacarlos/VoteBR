const { describe, beforeEach, it } = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const GeneralContractException = require("../../../src/App/Exception/Chaincode/GeneralContractException");
const ElectionResearchContractRepository = require("../../../src/App/Repository/ElectionResearchContractRepository");

describe("ElectionResearchContractRepository", () => {

    let chaincode = {};
    let repository = new ElectionResearchContractRepository()
    beforeEach(() => {
        chaincode.submitTransaction = sinon.stub();
        chaincode.evaluateTransaction = sinon.stub();
    });

    it("It must create an election research", async () => {
        chaincode.submitTransaction.returns();

        expect(async () => {
            await repository.createElectionResearch(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must insert candidate in election research", () => {
        chaincode.submitTransaction.returns();
        expect(async () => {
            await repository.insertCandidateInTheElectionResearch(chaincode, "Fulano", "01", "https://image.com");
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must remove candidate of election research", () => {
        chaincode.submitTransaction.returns();
        expect(async () => {
            await repository.removeCandidateOfElectionResearch(chaincode, "01");
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must begin colleting votes", () => {
        chaincode.submitTransaction.returns();
        expect(async () => {
            await repository.beginCollectingVotes(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must finish election research", () => {
        chaincode.submitTransaction.returns();
        expect(async () => {
            await repository.finishElectionResearch(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must search election research", () => {
        chaincode.evaluateTransaction.returns();
        expect(async () => {
            await repository.searchElectionResearch(chaincode, "2000", "01");
        
        }).to.not.throw(GeneralContractException);        
    });

    it("It must search election research without starting", () => {
        chaincode.evaluateTransaction.returns();
        expect(async () => {
            await repository.searchElectionResearchWithoutStarting(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must search election research in progress", () => {
        chaincode.evaluateTransaction.returns();
        expect(async () => {
            await repository.searchElectionResearchInProgress(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });

    it("It must search election research closed", () => {
        chaincode.evaluateTransaction.returns();
        expect(async () => {
            await repository.searchElectionResearchClosed(chaincode);
        
        }).to.not.throw(GeneralContractException);
    });
});