class Candidate {
    
	constructor(name, numberOfCandidate) {
		this.id = numberOfCandidate;
		this.name = name;		
		this.totalOfVotes = 0;
	}
    
	static makeCandidate(name, numberOfCandidate) {	           			
		return new Candidate(name, numberOfCandidate);			
	}

	static mountsCandidateObjectRetrievedFromTheBlockchain(candidateObject) {
		const candidate = new Candidate(null, null);
		
		candidate.id = candidateObject.id;
		candidate.name = candidateObject.name;
		candidate.totalOfVotes = candidateObject.totalOfVotes;

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