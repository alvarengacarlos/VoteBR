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
const NotExistingRecord = require("../lib/Exceptions/NotExistingRecord");
const AccessDenied = require("../lib/Exceptions/AccessDenied");
const ElectionResearchWithoutStartingDoesNotExist = require("../lib/Exceptions/ElectionResearchWithoutStartingDoesNotExist");
const ElectionResearchWithoutStartingExist = require("../lib/Exceptions/Admin/ElectionResearchWithoutStartingExist");
const ElectionResearchAlreadyStarted = require("../lib/Exceptions/ElectionResearchAlreadyStarted");
const ElectionResearchStartedExist = require("../lib/Exceptions/ElectionResearchStartedExist");
const TotalOfCandidatesIsZero = require("../lib/Exceptions/Admin/TotalOfCandidatesIsZero");
const UninitiatedElectionResearch = require("../lib/Exceptions/UninitiatedElectionResearch");

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

	describe("NotExistingRecord", () => {
		it("Must be NotExistingRecord instance", () => {
			const exception = new NotExistingRecord();
			expect(exception).instanceOf(NotExistingRecord);
		});
	});	

	describe("AccessDenied", () => {
		it("Must be AccessDenied instance", () => {
			const exception = new AccessDenied();
			expect(exception).instanceOf(AccessDenied);
		});
	});

	describe("ElectionResearchWithoutStartingDoesNotExist", () => {
		it("Must be ElectionResearchWithoutStartingDoesNotExist instance", () => {
			const exception = new ElectionResearchWithoutStartingDoesNotExist();
			expect(exception).instanceOf(ElectionResearchWithoutStartingDoesNotExist);
		});
	});

	describe("ElectionResearchWithoutStartingExist", () => {
		it("Must be ElectionResearchWithoutStartingExist instance", () => {
			const exception = new ElectionResearchWithoutStartingExist();
			expect(exception).instanceOf(ElectionResearchWithoutStartingExist);
		});
	});

	describe("ElectionResearchAlreadyStarting", () => {
		it("Must be ElectionResearchAlreadyWithoutStarting instance", () => {
			const exception = new ElectionResearchAlreadyStarted();
			expect(exception).instanceOf(ElectionResearchAlreadyStarted);
		});
	});

	describe("ElectionResearchStartedExist", () => {
		it("Must be ElectionResearchStartedExist instance", () => {
			const exception = new ElectionResearchStartedExist();
			expect(exception).instanceOf(ElectionResearchStartedExist);
		});
	});

	describe("TotalOfCandidatesIsZero", () => {
		it("Must be TotalOfCandidatesIsZero instance", () => {
			const exception = new TotalOfCandidatesIsZero();
			expect(exception).instanceOf(TotalOfCandidatesIsZero);
		});
	});

	describe("UninitiatedElectionResearch", () => {
		it("Must be UninitiatedElectionResearch instance", () => {
			const exception = new UninitiatedElectionResearch();
			expect(exception).instanceOf(UninitiatedElectionResearch);
		});
	});

});