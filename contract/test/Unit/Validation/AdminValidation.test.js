const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const { describe, beforeEach } = require("mocha");

const AdminValidation = require("../../../lib/Validation/AdminValidation");
const IncorrectInformationReceived = require("../../../lib/Exceptions/IncorrectInformationReceived");

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

			expect({ year, month }).to.eql(value);
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

describe("AdminValidation", () => {

	let adminValidation;
	let name = "Anônimo Das Anônimas";
	let numberOfCandidate = "01";
	let photoUrl = "https://image.com.br";

	beforeEach(() => {
		adminValidation = new AdminValidation();
	});

	describe("#validateInsertCandidateInTheElectionResearch", () => {

		it("Must be successful, because values is correct", () => {
			const value = adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl);

			expect({ name, numberOfCandidate, photoUrl }).to.eql(value);
		});

	});

	describe("#validateInsertCandidateInTheElectionResearch: name", () => {

		it("Must throw an error for name size smaller than 4 digits", async () => {
			name = "Ano";

			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateInsertCandidateInTheElectionResearch: name", () => {

		it("Must throw an error for name size greater than 30 digits", () => {
			name = "Anonimo Anonimo Anonimo Anonimo";

			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateInsertCandidateInTheElectionResearch: numberOfCandidate", () => {

		it("Must throw an error for numberOfCandidate size smaller than 2 digits", () => {
			numberOfCandidate = "1";

			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateInsertCandidateInTheElectionResearch: numberOfCandidate", () => {

		it("Must throw an error for numberOfCandidate size greater than 2 digits", () => {
			numberOfCandidate = "100";

			expect(
				() => adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl)
			).to.throw(IncorrectInformationReceived);
		});

	});

});


describe("AdminValidation", () => {
	
	let adminValidation;
	let numberOfCandidate = "01";

	beforeEach(() => {
		adminValidation = new AdminValidation();
	});

	describe("#validateRemoveCandidateOfElectionResearch: numberOfCandidate", () => {
		
		it("Must be sucessfull", () => {
			const value = adminValidation.validateRemoveCandidateOfElectionResearch(numberOfCandidate);

			expect({numberOfCandidate}).to.eql(value);
		});
		
		it("Must throw an error for numberOfCandidate size smaller than 2 digits", () => {
			numberOfCandidate = "1";
	
			expect(
				() => adminValidation.validateRemoveCandidateOfElectionResearch(numberOfCandidate)
			).to.throw(IncorrectInformationReceived);
		});
		
		it("Must throw an error for numberOfCandidate size greater than 2 digits", () => {
			numberOfCandidate = "100";

			expect(
				() => adminValidation.validateRemoveCandidateOfElectionResearch(numberOfCandidate)
			).to.throw(IncorrectInformationReceived);
		});
	});	

});

describe("AdminAvaliation", () => {
    
	let adminValidation;
	let year = "2000";
	let month = "01";
    
	beforeEach(() => {
		adminValidation = new AdminValidation();
	});

	describe("#validateSearchElectionResearchLikeAdmin: year", () => {

		it("Must throw an error for year size smaller than 4 digits", () => {
			year = "200";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

		it("Must throw an error for year size greater than 4 digits", () => {
			year = "20000";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateSearchElectionResearchLikeAdmin: month", () => {
        
		it("Must throw an error for month size smaller than 2 digits", () => {
			month = "1";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

		it("Must throw an error for month size greater than 2 digits", () => {
			month = "011";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

		it("Must throw error for month smaller than 01", () => {
			month = "00";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

		it("Must throw error for month greather than 12", () => {
			month = "13";

			expect(
				() => adminValidation.validateSearchElectionResearchLikeAdmin(year, month)
			).to.throw(IncorrectInformationReceived);
		});

	});
});