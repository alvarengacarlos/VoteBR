const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const BirthDate = require("../../lib/Classes/BirthDate");

describe("BirthDate", () => {

    describe("#makeBirthDate", () => {
        
        it("Must create an birth date", () => {
            const birthDate = BirthDate.makeBirthDate("2000", "06", "23");

            expect(birthDate).to.eql({year: "2000", month: "06", day: "23"});
        });
        
    });

    describe("#getAge", () => {
        
        it("Must return an age", () => {            
            const birthDate = BirthDate.makeBirthDate("2000", "06", "23");

            const age = birthDate.getAge();

            expect(age >= 21).to.eql(true);
        });

    });

});