const { describe, it } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const EvaluateTransactionException = require("../../../../src/App/Exception/Chaincode/EvaluateTransactionException");

describe("EvaluateTransactionException", () => {

    const chaincodeError = {
        message: "error in simulation: transaction returned with failure: Error: INCORRECT_SECRET_PHRASE:400:The secret phrase is incorrect"            
    };

    describe("#extractMessage", () => {
        it("It must create exception with sucessfully", () => {
            const exception = new EvaluateTransactionException(chaincodeError);
    
            expect(exception.httpStatusCode).to.eql(400);
            expect(exception.internalCode).to.eql("INCORRECT_SECRET_PHRASE");
            expect(exception.message.includes("The secret phrase is incorrect")).to.eql(true);
        });
    });    

});
