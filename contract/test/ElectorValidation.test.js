const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const {describe, beforeEach} = require("mocha");

const ElectorValidation = require("../lib/Validation/ElectorValidation");
const IncorrectInformationReceived = require("../lib/Exceptions/IncorrectInformationReceived");

describe("ElectorValidation", () => {
    
    let electorValidation;
    let cpf;
    let year;
    let month;
    let day;
    let candidateNumber;

    beforeEach(() => {
        electorValidation = new ElectorValidation();

        cpf = "00000000000";
        year = "2000";
        month = "01";
        day = "01";
        candidateNumber = "01";
    });

    describe("#validateVote", () => {
        
        it("Must be successful, because values is correct", () => {
            const value = electorValidation.validateVote(cpf, year, month, day, candidateNumber);
            
            expect({cpf, year, month, day, candidateNumber}).to.eql(value);     
        });

    });

    describe("#validateVote: cpf", () => {        
        
        it("Must throw error for cpf less than 11 digits", () => {
            cpf = "0000000000";            
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);     
        });

        it("Must throw error for cpf greather than 11 digits", () => {
            cpf = "000000000000";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });     

    });

    describe("#validateVote: year", () => {

        it("Must throw an error for year size smaller than 4 digits", () => {            
            year = "200";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for year size greater than 4 digits", () => {            
            year = "20000";           
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

    });

    describe("#validateVote: month", () => {

        it("Must throw an error for month size smaller than 2 digits", () => {
            month = "1";           
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for month size greater than 2 digits", () => {
            month = "011";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

        it("Must throw error for month smaller than 01", () => {
            month = "00";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

        it("Must throw error for month greather than 12", () => {
            month = "13";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

    });

    describe("#validateVote: day", () => {

        it("Must throw an error for day size smaller than 2 digits", () => {
            day = "1";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for day size greater than 2 digits", () => {
            day = "011";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });
        
        
        it("Must throw error for month smaller than 01", () => {
            day = "00";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw error for month greather than 31", () => {
            day = "32";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

    });

    describe("#validateVote: candidateNumber", () => {
       
        it("Must throw an error for candidateNumber size smaller than 2 digits", () => {
            candidateNumber = "1";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for candidateNumber size greater than 2 digits", () => {
            candidateNumber = "100";
            
            expect(
                () => electorValidation.validateVote(cpf, year, month, day, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

    });



});