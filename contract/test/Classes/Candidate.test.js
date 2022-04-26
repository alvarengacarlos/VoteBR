const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const Candidate = require("../../lib/Classes/Candidate");

describe("Candidate", () => {

    describe("#addOneVote", () => {

        it("Must add a vote", () => {
            const candidate = Candidate.makeCandidate("Fulano", "10");

            candidate.addOneVote();

            expect(candidate.getTotalOfVotes()).to.eql(1);
        });
        
    });

});