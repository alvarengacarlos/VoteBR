const { describe, it } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const GeneralContractException = require("../../../../src/App/Exception/Chaincode/GeneralContractException");

describe("GeneralContractException", () => {

    const chaincodeError = {
        responses: [{
            response: {
                message: "error in simulation: transaction returned with failure: Error: ELECTION_RESEARCH_IN_PROGRESS:400:There is already an election research in progress"
            }
        }]
    };

    describe("#extractMessage", () => {
        it("It must create exception with sucessfully", () => {
            const exception = new GeneralContractException(chaincodeError);
    
            expect(exception.httpStatusCode).to.eql(400);
            expect(exception.internalCode).to.eql("ELECTION_RESEARCH_IN_PROGRESS");
            expect(exception.message.includes("There is already an election research in progress")).to.eql(true);
        });
    });    

});