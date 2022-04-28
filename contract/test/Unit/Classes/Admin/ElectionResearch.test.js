const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const ElectionResearch = require("../../../../lib/Classes/Admin/ElectionResearch");
const Candidate = require("../../../../lib/Classes/Admin/Candidate");

const ElectionResearchInProgress = require("../../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchClosed = require("../../../../lib/Exceptions/Admin/ElectionResearch/ElectionResearchClosed");
const ExistingRecord = require("../../../../lib/Exceptions/ExistingRecord");
const NotExistingRecord = require("../../../../lib/Exceptions/NotExistingRecord");
const TotalOfCandidatesIsZero = require("../../../../lib/Exceptions/Admin/TotalOfCandidatesIsZero");
const UninitiatedElectionResearch = require("../../../../lib/Exceptions/Admin/ElectionResearch/UninitiatedElectionResearch");

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
                isStart: false,
                isClose: false,
                createIn: new Date().toString(),
                startIn: null,
                finishIn: null
            };

            const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(object);

            expect(electionResearch).to.instanceOf(ElectionResearch);
            expect(electionResearch).to.eql(object);
        });

    });

    describe("#insertCandidate", () => {

        it("Must be successfully in insert candidate", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);                      
            
            expect(electionResearch.candidatesList[0]).to.eql(candidate);
        });

        it("Must throw exception to ElectionResearchInProgress", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.beginCollectingVotes();
                                    
            expect(() => electionResearch.insertCandidate(candidate)).to.throw(ElectionResearchInProgress)
        });


        it("Must throw exception to ElectionResearchClosed", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.beginCollectingVotes();
            electionResearch.isStart = false;
            electionResearch.isClose = true;
                                    
            expect(() => electionResearch.insertCandidate(candidate)).to.throw(ElectionResearchClosed)
        });
        
        it("Must throw exception to ExistingRecord", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);                      
            
            expect(() => electionResearch.insertCandidate(candidate)).to.throw(ExistingRecord);
        });

        

    });

    describe("#getCandidateIndex", () => {

        it("Must throw exception to NotExistingRecord", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            const candidate = Candidate.makeCandidate("Fulano", "01");

            expect(() => electionResearch.getCandidateIndex(candidate)).to.throw(NotExistingRecord);
        });

        it("Must be successfully in get candidate index", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            const candidate = Candidate.makeCandidate("Fulano", "01");
            electionResearch.insertCandidate(candidate);

            const index = electionResearch.getCandidateIndex(candidate);

            expect(index).to.eql(0);
        });

    });

    describe("#removeCandidate", () => {

        it("Must be successfully in remove candidate", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.removeCandidate(candidate); 
                    
            expect(electionResearch.candidatesList).to.empty;
        });

        it("Must throw exception to ElectionResearchInProgress", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.beginCollectingVotes();
                                    
            expect(() => electionResearch.removeCandidate(candidate)).to.throw(ElectionResearchInProgress)
        });


        it("Must throw exception to ElectionResearchClosed", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);
            electionResearch.beginCollectingVotes();
            electionResearch.isStart = false;
            electionResearch.isClose = true;
                                    
            expect(() => electionResearch.removeCandidate(candidate)).to.throw(ElectionResearchClosed)
        });

    });

    describe("#getCandidate", () => {

        it("Must throw excepction NotExistRecord", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            const candidate = Candidate.makeCandidate("Fulano", "01");

            expect(() => electionResearch.getCandidate(candidate)).to.throw(NotExistingRecord);
        });

        it("Must return a successfull candidate", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");

            electionResearch.insertCandidate(candidate);            

            const c = electionResearch.getCandidate(candidate);

            expect(c).to.eql(candidate);
        });

    });

    describe("#beginCollectingVotes", () => {

        it("Must begin collecting votes", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            
            const candidate = Candidate.makeCandidate("Fulano", "01");
            electionResearch.insertCandidate(candidate);

            electionResearch.beginCollectingVotes();

            expect(electionResearch.isStart).to.eql(true);
        });

        it("Must throw exception to ElectionResearachInProgress o", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
            
            const candidate = Candidate.makeCandidate("Fulano", "01");
            electionResearch.insertCandidate(candidate);

            electionResearch.beginCollectingVotes();

            expect(() => electionResearch.beginCollectingVotes()).to.throw(ElectionResearchInProgress);	
		});
        
        it("Must throw exception to TotalOfCandidatesIsZero", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
            
            expect(() => electionResearch.beginCollectingVotes()).to.throw(TotalOfCandidatesIsZero);	
		});

        it("Must throw exception to ElectionResearchClosed", async () => {
			const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");	
            
            const candidate = Candidate.makeCandidate("Fulano", "01");
            electionResearch.insertCandidate(candidate);

            electionResearch.beginCollectingVotes();
            electionResearch.finishElectionResearch();
            electionResearch.isStart = false;

            expect(() => electionResearch.beginCollectingVotes()).to.throw(ElectionResearchClosed);	
		});

    });

    describe("#finishCollectingVotesAndElectionResearch", () => {

        it("Must throw exception to ElectionResearchClosed", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            electionResearch.beginCollectingVotes();
            electionResearch.finishElectionResearch();

            expect(() => electionResearch.finishElectionResearch()).to.throw(ElectionResearchClosed)
        }); 

        it("Must throw exception to UninitiatedElectionResearch", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            expect(() => electionResearch.finishElectionResearch()).to.throw(UninitiatedElectionResearch)
        }); 
        
        it("Must finish ", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");
            electionResearch.insertCandidate(Candidate.makeCandidate("Fulano", "01"));

            electionResearch.beginCollectingVotes();

            electionResearch.finishElectionResearch();

            expect(electionResearch.isClose).to.eql(true);
        });

    });

    
});