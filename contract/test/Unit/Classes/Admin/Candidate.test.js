const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const Candidate = require("../../../../lib/Classes/Admin/Candidate");

describe("Candidate", () => {

	describe("#makeCandidate", () => {

		it("Must return an instance of Candidate", () => {
			const candidate = Candidate.makeCandidate("Fulano", "10", "http://image.com");

			expect(candidate).to.instanceOf(Candidate);
		});

	});

	describe("#addOneVote", () => {

		it("Must add a vote", () => {
			const candidate = Candidate.makeCandidate("Fulano", "10", "http://image.com");

			candidate.addOneVote();

			expect(candidate.totalOfVotes).to.eql(1);
		});
        
	});

	describe("#mountsCandidateObjectRetrievedFromTheBlockchain", () => {
        
		it("Must mount an Candidate Object", () => {
			const candidate = Candidate.makeCandidate("Fulano", "10", "http://image.com.br");

			const c = Candidate.mountsCandidateObjectRetrievedFromTheBlockchain(candidate);

			expect(c).to.eql(candidate);
		});
        
	});

});