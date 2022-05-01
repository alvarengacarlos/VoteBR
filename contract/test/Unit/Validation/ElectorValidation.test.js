const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const {describe, beforeEach} = require("mocha");

const ElectorValidation = require("../../../lib/Validation/ElectorValidation");
const IncorrectInformationReceived = require("../../../lib/Exceptions/IncorrectInformationReceived");

describe("ElectorValidation", () => {
    
    let electorValidation;
    let cpf;
    let candidateNumber;

    beforeEach(() => {
        electorValidation = new ElectorValidation();
        cpf = "00000000000";
        candidateNumber = "01";
    });

    describe("#validateVote", () => {
        
        it("Must be successful, because values is correct", () => {
            const value = electorValidation.validateVote(cpf, candidateNumber);
            
            expect({cpf, candidateNumber}).to.eql(value);     
        });

    });

    describe("#validateVote: cpf", () => {        
        
        it("Must throw error for cpf less than 11 digits", () => {
            cpf = "0000000000";            
            
            expect(
                () => electorValidation.validateVote(cpf, candidateNumber)
            ).to.throw(IncorrectInformationReceived);     
        });

        it("Must throw error for cpf greather than 11 digits", () => {
            cpf = "000000000000";
            
            expect(
                () => electorValidation.validateVote(cpf, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });     

    });

    describe("#validateVote: candidateNumber", () => {
       
        it("Must throw an error for candidateNumber size smaller than 2 digits", () => {
            candidateNumber = "1";
            
            expect(
                () => electorValidation.validateVote(cpf, candidateNumber)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for candidateNumber size greater than 2 digits", () => {
            candidateNumber = "100";
            
            expect(
                () => electorValidation.validateVote(cpf, candidateNumber)
            ).to.throw(IncorrectInformationReceived); 
        });

    });    
});

describe("ElectorValidation", () => {
    
    let electorValidation, year, month, cpf;

    beforeEach(() => {
        electorValidation = new ElectorValidation();
        yearElectionResearch = "2000";
        monthElectionResearch = "01";
        cpf = "00000000000";
    });

    describe("#validateSearchElector: cpf", () => {        
        
        it("Must throw error for cpf less than 11 digits", () => {
            cpf = "0000000000";            
            
            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);     
        });

        it("Must throw error for cpf greather than 11 digits", () => {
            cpf = "000000000000";
            
            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });     

    });


    describe("#validateSearchElector: yearElectionResearch", () => {

        it("Must throw an error for yearElectionResearch size smaller than 4 digits", () => {
            yearElectionResearch = "200";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for yearElectionResearch size greater than 4 digits", () => {
            yearElectionResearch = "20000";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });
    });
    
    describe("#validateSearchElector: monthElectionResearch", () => {

        it("Must throw an error for monthElectionResearch size smaller than 2 digits", () => {
            monthElectionResearch = "1";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for monthElectionResearch size greater than 2 digits", () => {
            monthElectionResearch = "011";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw error for monthElectionResearch smaller than 01", () => {
            monthElectionResearch = "00";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw error for monthElectionResearch greather than 12", () => {
            monthElectionResearch = "13";

            expect(
                () => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf)
            ).to.throw(IncorrectInformationReceived);
        });
    });
});

describe("ElectorValidation", () => {
    
    let electorValidation, year, month;

    beforeEach(() => {
        electorValidation = new ElectorValidation();
        year = "2000";
        month = "01";
    });

    describe("#validateSearchElectionResearchLikeElector: year", () => {

        it("Must throw an error for year size smaller than 4 digits", () => {
            year = "200";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for year size greater than 4 digits", () => {
            year = "20000";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });
    });
    
    describe("#validateSearchElectionResearchLikeElector: month", () => {

        it("Must throw an error for month size smaller than 2 digits", () => {
            month = "1";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw an error for month size greater than 2 digits", () => {
            month = "011";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw error for month smaller than 01", () => {
            month = "00";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });

        it("Must throw error for month greather than 12", () => {
            month = "13";

            expect(
                () => electorValidation.validateSearchElectionResearchLikeElector(year, month)
            ).to.throw(IncorrectInformationReceived);
        });
    });
});