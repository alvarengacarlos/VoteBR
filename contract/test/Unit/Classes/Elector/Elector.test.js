const {describe, beforeEach, it} = require("mocha");
const chai = require("chai");

const expect = chai.expect;

const Elector = require("../../../../lib/Classes/Elector/Elector");
const BirthDate = require("../../../../lib/Classes/Elector/BirthDate");
const ElectionResearch = require("../../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../../lib/Classes/Admin/Candidate");

const InvalidAge = require("../../../../lib/Exceptions/Elector/InvalidAge");
const InvalidCpf = require("../../../../lib/Exceptions/Elector/InvalidCpf");

describe("Elector", () => {

    let birthDate, electionResearch, candidate;

    beforeEach(() => {
        birthDate = BirthDate.makeBirthDate("2000", "01", "01");
        electionResearch = ElectionResearch.makeElectionResearch("2022", "01");
        candidate = Candidate.makeCandidate("Fulano", "01");
    });

    describe("#cpfIsValid", () => {
        
        it("Must return true", () => {
            const elector = new Elector("01234567890", birthDate, electionResearch, candidate);

            expect(elector.cpfIsValid("01234567890")).to.eql(true);
        });

        it("Must return false", () => {
            const elector = new Elector("01234567890", birthDate, electionResearch, candidate);

            expect(elector.cpfIsValid("00000000000")).to.eql(false);
        });
        
    });

    describe("#makeElector", () => {

        it("Must return an Elector instance", () => {
            const elector = Elector.makeElector("01234567890", birthDate, electionResearch, candidate);

            expect(elector).to.be.an.instanceOf(Elector);
        });
        
        it("Must throw InvalidAge exception", () => {
            const year = new Date().getFullYear().toString();            
            birthDate = BirthDate.makeBirthDate(year, "01", "01");

            expect(() => Elector.makeElector("01234567890", birthDate, electionResearch, candidate))
                .to.throw(InvalidAge);
        });

        it("Must throw IvalidCpf exception", () => {
            expect(() => Elector.makeElector("00000000000", birthDate, electionResearch, candidate))
                .to.throw(InvalidCpf);
        });

    });    

});