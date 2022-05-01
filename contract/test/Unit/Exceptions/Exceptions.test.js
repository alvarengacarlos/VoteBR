const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const Exception = require("../../../lib/Exceptions/Exception");
const TotalVotesAchieved = require("../../../lib/Exceptions/Elector/TotalVotesAchieved");
const IncorrectInformationReceived = require("../../../lib/Exceptions/IncorrectInformationReceived");
const ExistingRecord = require("../../../lib/Exceptions/ExistingRecord");
const NotExistingRecord = require("../../../lib/Exceptions/NotExistingRecord");
const AccessDenied = require("../../../lib/Exceptions/AccessDenied");
const ElectionResearchWithoutStartingExist = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchNotFound = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");
const TotalOfCandidatesIsZero = require("../../../lib/Exceptions/Admin/TotalOfCandidatesIsZero");
const UninitiatedElectionResearch = require("../../../lib/Exceptions/Admin/ElectionResearch/UninitiatedElectionResearch");
const ElectionResearchInProgress = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchClosed = require("../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchClosed");

describe("Exceptions/*", () => {
    
	describe("Exception Class", () => {
		it("Must be Exception instance", () => {
			const exception = new Exception("NOT_FOUND", 404, "Page not found");
            
			expect(exception).instanceOf(Exception);
			expect(exception.message).equal("Page not found");            
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

	describe("ElectionResearchWithoutStartingExist", () => {
		it("Must be ElectionResearchWithoutStartingExist instance", () => {
			const exception = new ElectionResearchWithoutStartingExist();
			expect(exception).instanceOf(ElectionResearchWithoutStartingExist);
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

	describe("ElectionResearchNotfound", () => {
		it("Must be ElectionResearchNotFound instance", () => {
			const exception = new ElectionResearchNotFound();
			expect(exception).instanceOf(ElectionResearchNotFound);
		});
	});

	describe("ElectionResearchInProgress", () => {
		it("Must be  ElectionResearchInProgress instance", () => {
			const exception = new ElectionResearchInProgress();		
			expect(exception).instanceOf(ElectionResearchInProgress);
		});
	});

	describe("ElectionResearchClosed", () => {
		it("Must be  ElectionResearchClosed instance", () => {
			const exception = new ElectionResearchClosed();		
			expect(exception).instanceOf(ElectionResearchClosed);
		});
	});

});