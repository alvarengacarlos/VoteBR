const { describe, beforeEach, it } = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const GeneralContractException = require("../../../src/App/Exception/Chaincode/GeneralContractException");
const ElectorContractRepository = require("../../../src/App/Repository/ElectorContractRepository");

describe("ElectorContractRepository", () => {
    
    let repository = new ElectorContractRepository();
    let chaincode = {};
    beforeEach(() => {
        chaincode.submitTransaction = sinon.stub();
        chaincode.evaluateTransaction = sinon.stub();
    });

    it("It must vote", () => {
        chaincode.submitTransaction.returns();

        expect(async () => {
            await repository.vote(chaincode, "1234567abcdefg", "01", "secret");
        }).to.not.throw(GeneralContractException);
    });

    it("It must search elector", () => {
        chaincode.evaluateTransaction.returns();

        expect(async () => {
            await repository.searchElector(chaincode, "2000", "01", "123456abcdefg", "secret");
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