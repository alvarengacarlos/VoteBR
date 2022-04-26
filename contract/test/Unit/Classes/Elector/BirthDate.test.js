const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const BirthDate = require("../../../../lib/Classes/Elector/BirthDate");

describe("BirthDate", () => {

    describe("#makeBirthDate", () => {
        
        it("Must create an birth date", () => {
            const birthDate = BirthDate.makeBirthDate("2000", "06", "23");

            expect(birthDate).to.instanceOf(BirthDate);
        });
        
    });

    describe("#getAge", () => {
        
        it("Must return an age", () => {            
            const birthDate = BirthDate.makeBirthDate("2000", "06", "23");

            const age = birthDate.getAge();
            
            expect(age >= 22).to.eql(true);
        });

    });

});