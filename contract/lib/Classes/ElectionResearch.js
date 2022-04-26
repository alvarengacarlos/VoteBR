const ExistingRecord = require("../Exceptions/ExistingRecord");
const Serializer = require("./Serializer");
const CandidateDoesNotExist = require("../Exceptions/CandidateDoesNotExist");
const Candidate = require("./Candidate");
const ElectionResearchAlreadyStarted = require("../Exceptions/ElectionResearchAlreadyStarted");
const TotalOfCandidatesIsZero = require("../Exceptions/Admin/TotalOfCandidatesIsZero");
const UninitiatedElectionResearch = require("../Exceptions/UninitiatedElectionResearch");

class ElectionResearch extends Serializer {
    
    constructor(id) {
        super();
        this.id = id;
        this.candidatesList = [];
        this.start = false;
        this.close = false;
        this.createIn = new Date().toString();
        this.finishIn = null;
    }

    static makeElectionResearch(year, month) {        
        const id = `${year}-${month}`;        
        
        return new ElectionResearch(id);
    }

    static mountsObjectRetrievedFromTheBlockchain(electionResearchObject) {
        const electionResearch = new ElectionResearch(null);
        
        electionResearch.id = electionResearchObject.id;
        electionResearch.candidatesList = electionResearchObject.candidatesList;
        electionResearch.start = electionResearchObject.start;
        electionResearch.close = electionResearchObject.close;
        electionResearch.createIn = electionResearchObject.createIn;
        electionResearch.finishIn = electionResearchObject.finishIn;

        return electionResearch;
    }

    getId() {
        return this.id;
    }

    insertCandidate(candidate) {
        if (this.start) {
            throw new ElectionResearchAlreadyStarted();
        }

        for (const c of this.candidatesList) {                         
            if(c.getId() == candidate.getId()) {
                throw new ExistingRecord();
            }
        }      

        this.candidatesList.push(candidate);
    }

    beginCollectingVotes() {        
        if (this.candidatesList.length == 0) {
            throw new TotalOfCandidatesIsZero();
        }

        this.start = true;
    }

    finishCollectingVotesAndElectionResearch() {
        if (this.start == false) {
            throw new UninitiatedElectionResearch();
        }

        this.close = true;
        this.finishIn = new Date().toString();
    }
    
    getCandidate(candidate) {
        for (const c of this.candidatesList) {                         
            if(candidate.getId() == c.getId()) {
                return Candidate.makeCandidate(c.getName(), c.getId(), c.getTotalOfVotes());
            }
        }  
        
        throw new CandidateDoesNotExist();
    }

}

module.exports = ElectionResearch;