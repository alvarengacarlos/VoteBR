class Candidate {
    
	constructor(name, numberOfCandidate, photoUrl) {
		this.id = numberOfCandidate;
		this.name = name;		
		this.totalOfVotes = 0;
		this.photoUrl = photoUrl;
	}
    
	static makeCandidate(name, numberOfCandidate, photoUrl) {	           			
		return new Candidate(name, numberOfCandidate, photoUrl);			
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