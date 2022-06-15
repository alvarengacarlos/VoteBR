const ContractBase = require("./ContractBase");
const AdminValidation = require("./Validation/AdminValidation");
const ElectionResearchRepository = require("./Repository/ElectionResearchRepository");

//Classes
const ElectionResearch = require("./Classes/Admin/ElectionResearch");
const Candidate = require("./Classes/Admin/Candidate");

//Exceptions
const ElectionResearchWithoutStartingExist = require("./Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchInProgress = require("./Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchNotFound = require("./Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

class AdminContract extends ContractBase {

	constructor() {
		super();
		this.validation = new AdminValidation();
		this.repository = new ElectionResearchRepository();		
	}

	async createElectionResearch(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		this.validation.validateCreateElectionResearch(year, month);
	
		const electionResearchWithoutStartingList = await this.repository.retrieveElectionResearchWithoutStarting(ctx);    
		if (electionResearchWithoutStartingList.length != 0) {
			throw new ElectionResearchWithoutStartingExist();
		}
        
		const electionResearchInProgressList = await this.repository.retrieveElectionResearchInProgress(ctx);
		if (electionResearchInProgressList.length != 0) {
			throw new ElectionResearchInProgress();
		}

		const electionResearch = ElectionResearch.makeElectionResearch(year, month);

		await this.repository.createElectionResearch(ctx, electionResearch);
	}

	async insertCandidateInTheElectionResearch(ctx, name, candidateNumber, photoUrl) {
		this._checkAuthorityAdmin(ctx);

		this.validation.validateInsertCandidateInTheElectionResearch(name, candidateNumber, photoUrl);

		const electionResearchWithoutStartingList = await this.repository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		}        

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);
        
		const candidate = Candidate.makeCandidate(name, candidateNumber, photoUrl);
		electionResearch.insertCandidate(candidate);
        
		await this.repository.updateElectionResearch(ctx, electionResearch);
	}

	async removeCandidateOfElectionResearch(ctx, candidateNumber) {
		this._checkAuthorityAdmin(ctx);

		this.validation.validateRemoveCandidateOfElectionResearch(candidateNumber);

		const electionResearchWithoutStartingList = await this.repository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		}        

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);
        
		const candidate = Candidate.makeCandidate(null, candidateNumber);
		electionResearch.removeCandidate(candidate);
        
		await this.repository.updateElectionResearch(ctx, electionResearch);
	}

	async beginCollectingVotes(ctx) {
		this._checkAuthorityAdmin(ctx);

		const electionResearchWithoutStartingList = await this.repository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		} 

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);

		electionResearch.beginCollectingVotes();

		await this.repository.updateElectionResearch(ctx, electionResearch);
	}
	
	async finishElectionResearchAndCollectingVotes(ctx) {
		this._checkAuthorityAdmin(ctx);

		const electionResearchInProgressList = await this.repository.retrieveElectionResearchInProgress(ctx);
		if (electionResearchInProgressList.length == 0) {
			throw new ElectionResearchNotFound();
		}

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchInProgressList[0]);

		electionResearch.finishElectionResearch();

		await this.repository.updateElectionResearch(ctx, electionResearch);
	}

	async retrieveElectionResearch(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		this.validation.validateSearchElectionResearch(year, month);

		const electionResearch = ElectionResearch.makeElectionResearch(year, month);
		
		const electionResearchBuffer = await this.repository.retrieveElectionResearch(ctx, electionResearch);
		
		return JSON.parse(electionResearchBuffer.toString());	
	}

	async retrieveElectionResearchWithoutStarting(ctx) {
		this._checkAuthorityAdmin(ctx);

		const electionResearchWithoutStartingList = await this.repository.retrieveElectionResearchWithoutStarting(ctx);
		
		return electionResearchWithoutStartingList;
	}

	async retrieveElectionResearchInProgress(ctx) {
		this._checkAuthorityAdmin(ctx);

		const electionResearchInProgressList = await this.repository.retrieveElectionResearchInProgress(ctx);

		return electionResearchInProgressList;
	}

	async retrieveElectionResearchClosed(ctx) {
		this._checkAuthorityAdmin(ctx);

		const electionResearchClosedList = await this.repository.retrieveElectionResearchClosed(ctx);

		return electionResearchClosedList;
	}
}

module.exports = AdminContract;