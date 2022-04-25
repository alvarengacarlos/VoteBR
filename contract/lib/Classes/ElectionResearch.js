const ExistingRecord = require("../Exceptions/ExistingRecord");
const Serializer = require("./Serializer");
const CandidateDoesNotExist = require("../Exceptions/CandidateDoesNotExist");
const Candidate = require("./Candidate");
const ElectionResearchAlreadyStarted = require("../Exceptions/ElectionResearchAlreadyStarted");
const ElectionResearchAlreadyClosed = require("../Exceptions/ElectionResearchAlreadyClosed");

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

    startElectoralResearch() {
        this.start = true;
    }

    getId() {
        return this.id;
    }

    insertCandidate(candidate) {
        if (this.start) {
            throw new ElectionResearchAlreadyStarted();
        }

        if (this.close) {
            throw new ElectionResearchAlreadyClosed();
        }

        for (const c of this.candidatesList) {                         
            if(c.getId() == candidate.getId()) {
                throw new ExistingRecord();
            }
        }      

        this.candidatesList.push(candidate);
    }

    getCandidate(numberOfCandidate) {
        for (const candidate of this.candidatesList) {                         
            if(numberOfCandidate == candidate.getId()) {
                return Candidate.makeCandidate(candidate.getName(), candidate.getId(), candidate.getTotalOfVotes());
            }
        }  
        
        throw new CandidateDoesNotExist();
    }

}

module.exports = ElectionResearch;