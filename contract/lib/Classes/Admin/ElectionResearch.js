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
		this.createIn = Date.now();
		this.startIn = null;
		this.finishIn = null;
		this.totalOfVotes = 0;
	}

	static makeElectionResearch(year, month) {        
		const id = `${year}-${month}`;        
        
		return new ElectionResearch(id);
	}

	static mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchObject) {
		const electionResearch = new ElectionResearch(null);
        
		electionResearch.id = electionResearchObject.id;
		electionResearch.candidatesList = electionResearchObject.candidatesList;
		electionResearch.isStart = electionResearchObject.isStart;
		electionResearch.isClose = electionResearchObject.isClose;
		electionResearch.createIn = electionResearchObject.createIn;
		electionResearch.startIn = electionResearchObject.startIn;
		electionResearch.finishIn = electionResearchObject.finishIn;
		electionResearch.totalOfVotes = electionResearchObject.totalOfVotes;

		return electionResearch;
	}

	getId() {
		return this.id;
	}

	addOneVote() {
		this.totalOfVotes++; 
	}

	getTotalOfVotes() {
		return this.totalOfVotes;
	}

	insertCandidate(candidate) {
		if (this.isStart == true) {
			throw new ElectionResearchInProgress();
		}

		if (this.isClose == true) {
			throw new ElectionResearchClosed();
		}

		for (const c of this.candidatesList) {
			let candidateMounted = Candidate.mountsCandidateObjectRetrievedFromTheBlockchain(c);                         
			
			if(candidateMounted.getId() == candidate.getId()) {
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
			let candidateMounted = Candidate.mountsCandidateObjectRetrievedFromTheBlockchain(c); 

			if (candidateMounted.getId() == candidate.getId()) {
				return i;
			}

			i += 1;
		}

		throw new NotExistingRecord();
	}

	updateCandidate(candidate) {		

		if (this.isClose == true) {
			throw new ElectionResearchClosed();
		}

		const index = this.getCandidateIndex(candidate);

		this.candidatesList[index] = candidate;
	}

	getCandidateByNumber(candidateNumber) {
		for (let c of this.candidatesList) {  
			const candidateMounted = Candidate.mountsCandidateObjectRetrievedFromTheBlockchain(c);                 
			
			if(candidateNumber == candidateMounted.getId()) {
				return candidateMounted;
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
		this.totalOfVotes = 0;
		this.startIn = Date.now();
	}

	finishElectionResearch() {
		if (this.isClose == true) {
			throw new ElectionResearchClosed();
		}

		if (this.isStart == false) {
			throw new UninitiatedElectionResearch();
		}

		this.isClose = true;
		this.finishIn = Date.now();
	}

}

module.exports = ElectionResearch;