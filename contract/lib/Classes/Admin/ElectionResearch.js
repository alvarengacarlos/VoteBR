const Serializer = require("../Serializer");
const Candidate = require("./Candidate");

const ElectionResearchInProgress = require("../../Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchClosed = require("../../Exceptions/Admin/ElectionResearch/ElectionResearchClosed");
const ExistingRecord = require("../../Exceptions/ExistingRecord");
const NotExistingRecord = require("../../Exceptions/NotExistingRecord");
const TotalOfCandidatesIsZero = require("../../Exceptions/Admin/TotalOfCandidatesIsZero");
const UninitiatedElectionResearch = require("../../Exceptions/Admin/ElectionResearch/UninitiatedElectionResearch");

class ElectionResearch extends Serializer {
    
    constructor(id) {
        super();
        this.id = id;
        this.candidatesList = [];
        this.isStart = false;
        this.isClose = false;
        this.createIn = new Date().toString();
        this.startIn = null;
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
        electionResearch.isStart = electionResearchObject.isStart;
        electionResearch.isClose = electionResearchObject.isClose;
        electionResearch.createIn = electionResearchObject.createIn;
        electionResearch.startIn = electionResearchObject.startIn;
        electionResearch.finishIn = electionResearchObject.finishIn;

        return electionResearch;
    }

    getId() {
        return this.id;
    }

    insertCandidate(candidate) {
        if (this.isStart == true) {
            throw new ElectionResearchInProgress();
        }

        if (this.isClose == true) {
            throw new ElectionResearchClosed();
        }

        for (const c of this.candidatesList) {                         
            if(c.getId() == candidate.getId()) {
                throw new ExistingRecord();
            }
        }      

        this.candidatesList.push(candidate);
    }

    removeCandidate(candidate) {
        if (this.isStart == true) {
            throw new ElectionResearchInProgress();
        }

        if (this.isClose == true) {
            throw new ElectionResearchClosed();
        }

        const index = this.getCandidateIndex(candidate);

        this.candidatesList.splice(index, 1);
    }

    getCandidateIndex(candidate) {
        let i = 0;
        for (let c of this.candidatesList) {
            if (c.getId() == candidate.getId()) {
                return i;
            }

            i += 1;
        }

        throw new NotExistingRecord();
    }

    getCandidate(candidate) {
        for (let c of this.candidatesList) {                         
            if(candidate.getId() == c.getId()) {
                return Candidate.makeCandidate(c.getName(), c.getId(), c.getTotalOfVotes());
            }
        }  
        
        throw new NotExistingRecord();
    }

    beginCollectingVotes() {        
        if (this.isStart == true) {
            throw new ElectionResearchInProgress();
        }
        
        if (this.candidatesList.length == 0) {
            throw new TotalOfCandidatesIsZero();
        }

        if (this.isClose == true) {
            throw new ElectionResearchClosed();
        }

        this.isStart = true;
        this.startIn = new Date().toString();
    }

    finishElectionResearch() {
        if (this.isClose == true) {
            throw new ElectionResearchClosed();
        }

        if (this.isStart == false) {
            throw new UninitiatedElectionResearch();
        }

        this.isClose = true;
        this.finishIn = new Date().toString();
    }
    
    

}

module.exports = ElectionResearch;