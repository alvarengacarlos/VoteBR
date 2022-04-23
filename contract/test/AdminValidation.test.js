const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const {describe, beforeEach} = require("mocha");

const AdminValidation = require("../lib/Validation/AdminValidation");
const IncorrectInformationReceived = require("../lib/Exceptions/IncorrectInformationReceived");

describe("AdminValidation", () => {

    let adminValidation;
    let year = "2000";
    let month = "01";

    beforeEach(() => {
        adminValidation = new AdminValidation();
    });

    describe("#validatesCreateElectionResearch", () => {
        
        it("Must be successful, because values is correct", () => {
            const value = adminValidation.validateCreateElectionResearch(year, month);
            
            expect({year, month}).to.eql(value);     
        });

    });

    describe("#validateCreateElectionResearch: year", () => {

        it("Must throw an error for year size smaller than 4 digits", () => {            
            year = "200";
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for year size greater than 4 digits", () => {            
            year = "20000";           
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived); 
        });

    });

    describe("#validateCreateElectionResearch: month", () => {

        it("Must throw an error for month size smaller than 2 digits", () => {
            month = "1";           
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for month size greater than 2 digits", () => {
            month = "011";
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived); 
        });

        it("Must throw error for month smaller than 01", () => {
            month = "00";
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived); 
        });

        it("Must throw error for month greather than 12", () => {
            month = "13";
            
            expect(
                () => adminValidation.validateCreateElectionResearch(year, month)
            ).to.throw(IncorrectInformationReceived); 
        });

    });

});