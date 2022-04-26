const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const ElectionResearch = require("../../lib/Classes/ElectionResearch");
const TotalOfCandidatesIsZero = require("../../lib/Exceptions/Admin/TotalOfCandidatesIsZero");
const Candidate = require("../../lib/Classes/Candidate");
const UninitiatedElectionResearch = require("../../lib/Exceptions/UninitiatedElectionResearch");
const ElectionResearchAlreadyStarted = require("../../lib/Exceptions/ElectionResearchAlreadyStarted");
const ExistingRecord = require("../../lib/Exceptions/ExistingRecord");
const CandidateDoesNotExist = require("../../lib/Exceptions/CandidateDoesNotExist");

describe("ElectionResearch", () => {

    describe("#makeElectionResearch", () => {

        it("Must return an instance of ElectionResearch", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            expect(electionResearch).to.instanceOf(ElectionResearch);
        });

    });

    describe("#mountsObjectRetrievedFromTheBlockchain", () => {

        it("Must return an ElectionResearch object", () => {
            const object = {
                id: "2000-01",
                candidatesList: [],
                start: false,
                close: false,
                createIn: new Date().toString(),
                finishIn: null
            };

            const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(object);

            expect(electionResearch).to.instanceOf(ElectionResearch);
        });

    });

    describe("#insertCandidate", () => {

        it("Must throw exeption to ElectionResearchAlreadyStarted", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.beginCollectingVotes();
                                    
            expect(() => electionResearch.insertCandidate(candidate)).to.throw(ElectionResearchAlreadyStarted)
        });
        
        it("Must throw exeption to ExistingRecord", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);                      
            
            expect(() => electionResearch.insertCandidate(candidate)).to.throw(ExistingRecord);
        });

        it("Must insert candidate", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);                      
            
            expect(electionResearch.candidatesList[0]).to.eql(candidate);
        });

    });

    describe("#beginCollectingVotes", () => {

        it("Must throw exception to TotalOfCandidatesIsZero", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
            
            expect(() => electionResearch.beginCollectingVotes()).to.throw(TotalOfCandidatesIsZero);	
		});

        it("Must begin collecting votes", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            electionResearch.beginCollectingVotes();

            expect(electionResearch.start).to.eql(true);
        });

    });

    describe("#finishCollectingVotesAndElectionResearch", () => {

        it("Must throw exception to UninitiatedElectionResearch", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            expect(() => electionResearch.finishCollectingVotesAndElectionResearch()).to.throw(UninitiatedElectionResearch)
        }); 
        
        it("Must finish ", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            electionResearch.beginCollectingVotes();

            electionResearch.finishCollectingVotesAndElectionResearch();

            expect(electionResearch.close).to.eql(true);
        });

    });

    describe("#getCandidate", () => {

        it("Must throw excepction CandidateDoesNotExist", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            const candidate = Candidate.makeCandidate("Fulano", "01");

            expect(() => electionResearch.getCandidate(candidate)).to.throw(CandidateDoesNotExist);
        });

        it("Must return a successfull candidate", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);            

            const c = electionResearch.getCandidate(candidate);

            expect(c).to.eql(candidate);
        });

    });
});