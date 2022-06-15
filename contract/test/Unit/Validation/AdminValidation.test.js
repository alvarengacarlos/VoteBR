const { describe, beforeEach, it } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const AdminValidation = require("../../../lib/Validation/AdminValidation");
const IncorrectInformationReceived = require("../../../lib/Exceptions/IncorrectInformationReceived");

describe("AdminValidation", () => {

	let adminValidation;

	beforeEach(() => {
		adminValidation = new AdminValidation();
	});

	describe("#validatesCreateElectionResearch", () => {

		it("Must be successful, because values is correct", () => {
			const value = adminValidation.validateCreateElectionResearch("2000", "01");

			expect({ year:"2000", month:"01" }).to.eql(value);
		});	

		it("Must throw an error, because values is incorrect", () => {
			
			expect(
				() => adminValidation.validateCreateElectionResearch("200", "01")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateCreateElectionResearch("20000", "01")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateCreateElectionResearch("2000", "1")
			).to.throw(IncorrectInformationReceived);

			
			expect(
				() => adminValidation.validateCreateElectionResearch("2000", "011")
			).to.throw(IncorrectInformationReceived);
		

			expect(
				() => adminValidation.validateCreateElectionResearch("2000", "00")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateCreateElectionResearch("2000", "13")
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateInsertCandidateInTheElectionResearch", () => {
		
		let name = "Anônimo Das Anônimas";
		let candidateNumber = "01";
		let photoUrl = "https://image.com.br";

		it("Must be successful, because values is correct", () => {
			const value = adminValidation.validateInsertCandidateInTheElectionResearch(name, candidateNumber, photoUrl);

			expect({ name, candidateNumber, photoUrl }).to.eql(value);
		});

	
		it("Must throw an error, because values is incorrect", async () => {
			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch("Jac", candidateNumber, photoUrl)
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch("Anonimo Anonimo Anonimo Anonimo", candidateNumber, photoUrl)
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, "1", photoUrl)
			).to.throw(IncorrectInformationReceived);

			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, "100", photoUrl)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateRemoveCandidateOfElectionResearch", () => {
		
		it("Must be sucessfull", () => {
			const value = adminValidation.validateRemoveCandidateOfElectionResearch("02");

			expect({ candidateNumber:"02" }).to.eql(value);
		});
		
		it("Must throw an error, because the values is incorrect", () => {
			expect(
				() => adminValidation.validateRemoveCandidateOfElectionResearch("1")
			).to.throw(IncorrectInformationReceived);

			expect(
				() => adminValidation.validateRemoveCandidateOfElectionResearch("011")
			).to.throw(IncorrectInformationReceived);
		});

	});	

	describe("#validateSearchElectionResearch", () => {

		it("Must throw an error, because the values is incorrect", () => {
			expect(
				() => adminValidation.validateSearchElectionResearch("200", "01")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateSearchElectionResearch("20000", "01")
			).to.throw(IncorrectInformationReceived);

			expect(
				() => adminValidation.validateSearchElectionResearch("2000", "1")
			).to.throw(IncorrectInformationReceived);

			expect(
				() => adminValidation.validateSearchElectionResearch("2000", "011")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateSearchElectionResearch("2000", "00")
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => adminValidation.validateSearchElectionResearch("2000", "13")
			).to.throw(IncorrectInformationReceived);
		});

	});
	
});