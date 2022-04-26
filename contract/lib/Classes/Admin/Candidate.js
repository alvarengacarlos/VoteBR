class Candidate {
    
	constructor(name, numberOfCandidate) {
		this.id = numberOfCandidate;
		this.name = name;		
		this.totalOfVotes = 0;
	}
    
	static makeCandidate(name, numberOfCandidate) {	           			
		return new Candidate(name, numberOfCandidate);			
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