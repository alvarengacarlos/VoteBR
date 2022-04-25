const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const Exception = require("../lib/Exceptions/Exception");
const CandidateDoesNotExist = require("../lib/Exceptions/CandidateDoesNotExist");
const InvalidCpf = require("../lib/Exceptions/InvalidCpf");
const InvalidAge = require("../lib/Exceptions/InvalidAge");
const CpfDoesNotExists = require("../lib/Exceptions/CpfDoesNotExist");
const TotalVotesAchieved = require("../lib/Exceptions/TotalVotesAchieved");
const IncorrectInformationReceived = require("../lib/Exceptions/IncorrectInformationReceived");
const ExistingRecord = require("../lib/Exceptions/ExistingRecord");
const AccessDenied = require("../lib/Exceptions/AccessDenied");
const ElectoralResearchWithoutStartingDoesNotExist = require("../lib/Exceptions/ElectoralResearchWithoutStartingDoesNotExist");
const ElectoralResearchWithoutStartingExist = require("../lib/Exceptions/Admin/ElectoralResearchWithoutStartingExist");

describe("Exceptions/*", () => {
    
	describe("Exception Class", () => {
		it("Must be Exception instance", () => {
			const exception = new Exception("NOT_FOUND", 404, "Page not found");
            
			expect(exception).instanceOf(Exception);
			expect(exception.message).equal("Page not found");            
		});
	});

	describe("CandidateDoesNotExist Class", () => {
		it("Must be CandidateDoesNotExist instance", () => {
			const exception = new CandidateDoesNotExist();
			expect(exception).instanceOf(CandidateDoesNotExist);
		});
	});

	describe("InvalidCpf", () => {
		it("Must be InvalidCpf instance", () => {
			const exception = new InvalidCpf();
			expect(exception).instanceOf(InvalidCpf);
		});
	});

	describe("CpfDoesNotExists", () => {
		it("Must be CpfDoesNotExists instance", () => {
			const exception = new CpfDoesNotExists();
			expect(exception).instanceOf(CpfDoesNotExists);
		});
	});

	describe("InvalidAge", () => {
		it("Must be InvalidAge instance", () => {
			const exception = new InvalidAge();
			expect(exception).instanceOf(InvalidAge);
		});
	});
    
	describe("TotalVotesAchieved", () => {
		it("Must be TotalVotesAchieved instance", () => {
			const exception = new TotalVotesAchieved();
			expect(exception).instanceOf(TotalVotesAchieved);
		});
	});

	describe("IncorrectInformationReceived", () => {
		it("Must be IncorrectInformationReceived instance", () => {
			const exception = new IncorrectInformationReceived();
			expect(exception).instanceOf(IncorrectInformationReceived);
		});
	});
	
	describe("ExistingRecord", () => {
		it("Must be ExistingRecord instance", () => {
			const exception = new ExistingRecord();
			expect(exception).instanceOf(ExistingRecord);
		});
	});

	describe("AccessDenied", () => {
		it("Must be AccessDenied instance", () => {
			const exception = new AccessDenied();
			expect(exception).instanceOf(AccessDenied);
		});
	});

	describe("ElectoralResearchWithoutStartingDoesNotExist", () => {
		it("Must be ElectoralResearchWithoutStartingDoesNotExist instance", () => {
			const exception = new ElectoralResearchWithoutStartingDoesNotExist();
			expect(exception).instanceOf(ElectoralResearchWithoutStartingDoesNotExist);
		});
	});

	describe("ElectoralResearchWithoutStartingExist", () => {
		it("Must be ElectoralResearchWithoutStartingExist instance", () => {
			const exception = new ElectoralResearchWithoutStartingExist();
			expect(exception).instanceOf(ElectoralResearchWithoutStartingExist);
		});
	});
	
});