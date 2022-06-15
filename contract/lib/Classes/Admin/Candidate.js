class Candidate {
    
	constructor(name, candidateNumber, photoUrl) {
		this.id = candidateNumber;
		this.name = name;		
		this.totalOfVotes = 0;
		this.photoUrl = photoUrl;
	}
    
	static makeCandidate(name, candidateNumber, photoUrl) {	           			
		return new Candidate(name, candidateNumber, photoUrl);			
	}

	static mountsCandidateObjectRetrievedFromTheBlockchain(candidateObject) {
		const candidate = new Candidate(null, null);
		
		candidate.id = candidateObject.id;
		candidate.name = candidateObject.name;
		candidate.totalOfVotes = candidateObject.totalOfVotes;
		candidate.photoUrl = candidateObject.photoUrl;

		return candidate;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getTotalOfVotes() {
		return this.totalOfVotes;
	}

	addOneVote() {
		this.totalOfVotes++;
	}
}

module.exports = Candidate;