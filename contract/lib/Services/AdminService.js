const ElectionResearch = require("../Classes/Admin/ElectionResearch");
const Candidate = require("../Classes/Admin/Candidate");

const ElectionResearchWithoutStartingExist = require("../Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchInProgress = require("../Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchNotFound = require("../Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");
const AdminRepository = require("../Repository/AdminRepository");

class AdminService {

	constructor() {
		this.adminRepository = new AdminRepository();
	}
    
	async createElectionResearch(ctx, year, month) {                                        
		const electionResearchWithoutStartingList = await this.adminRepository.retrieveElectionResearchWithoutStarting(ctx);    
		if (electionResearchWithoutStartingList.length != 0) {
			throw new ElectionResearchWithoutStartingExist();
		}
        
		const electionResearchInProgressList = await this.adminRepository.retrieveElectionResearchInProgress(ctx);
		if (electionResearchInProgressList.length != 0) {
			throw new ElectionResearchInProgress();
		}

		const electionResearch = ElectionResearch.makeElectionResearch(year, month);

		await this.adminRepository.createElectionResearch(ctx, electionResearch);        
	}

	async insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate) {
		const electionResearchWithoutStartingList = await this.adminRepository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		}        

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);
        
		const candidate = Candidate.makeCandidate(name, numberOfCandidate);
		electionResearch.insertCandidate(candidate);
        
		await this.adminRepository.updateElectionResearch(ctx, electionResearch);
	}

	async removeCandidateOfElectionResearch(ctx, numberOfCandidate) {
		const electionResearchWithoutStartingList = await this.adminRepository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		}        

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);
        
		const candidate = Candidate.makeCandidate(null, numberOfCandidate);
		electionResearch.removeCandidate(candidate);
        
		await this.adminRepository.updateElectionResearch(ctx, electionResearch);
	}

	async beginCollectingVotes(ctx) {
		const electionResearchWithoutStartingList = await this.adminRepository.retrieveElectionResearchWithoutStarting(ctx);
		if (electionResearchWithoutStartingList.length == 0) {
			throw new ElectionResearchNotFound();
		} 

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchWithoutStartingList[0]);

		electionResearch.beginCollectingVotes();

		await this.adminRepository.updateElectionResearch(ctx, electionResearch);
	}

	async finishElectionResearch(ctx) {
		const electionResearchInProgressList = await this.adminRepository.retrieveElectionResearchInProgress(ctx);
		if (electionResearchInProgressList.length == 0) {
			throw new ElectionResearchNotFound();
		}

		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchInProgressList[0]);

		electionResearch.finishElectionResearch();

		await this.adminRepository.updateElectionResearch(ctx, electionResearch);
	}

	async searchElectionResearch(ctx, yearElectionResearch, monthElectionResearch) {
		const electionResearch = ElectionResearch.makeElectionResearch(yearElectionResearch, monthElectionResearch);
		
		const electionResearchBuffer = await this.adminRepository.retrieveElectionResearch(ctx, electionResearch);
		
		return JSON.parse(electionResearchBuffer.toString());		
	}

	async searchElectionResearchInProgress(ctx) {
		const electionResearchInProgressList = await this.adminRepository.retrieveElectionResearchInProgress(ctx);

		return electionResearchInProgressList;
	}

	async searchElectionResearchClosed(ctx) {
		const electionResearchClosedList = await this.adminRepository.retrieveElectionResearchClosed(ctx);

		return electionResearchClosedList;
	}

}

module.exports = AdminService;