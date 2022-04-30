const process = require("dotenv").config();

const VOTE_LIMIT = Number(process.parsed.VOTE_LIMIT);

const TotalVotesAchieved = require("../Exceptions/Elector/TotalVotesAchieved");
const ElectionResearchNotFound = require("../Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

const Elector = require("../Classes/Elector/Elector");
const ElectionResearch = require("../Classes/Admin/ElectionResearch");
const AdminRepository = require("../Repository/AdminRepository");
const ElectorRepository = require("../Repository/ElectorRepository");

class ElectorService {
	
	constructor() {
		this.VOTE_LIMIT = VOTE_LIMIT;
		this.adminRepository = new AdminRepository();
		this.electorRepository = new ElectorRepository();	
	}

	async vote(ctx, cpf, numberOfCandidate) {
		const electionResearchInProgressArray = await this.adminRepository.retrieveElectionResearchInProgress(ctx);
        if (electionResearchInProgressArray.length == 0) {
            throw new ElectionResearchNotFound();
        }
		
		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchInProgressArray[0]);
		
		if (electionResearch.getTotalOfVotes() > this.VOTE_LIMIT) {
			throw new TotalVotesAchieved();
		}

		const candidate = electionResearch.getCandidateByNumber(numberOfCandidate);
		candidate.addOneVote();
		electionResearch.addOneVote();

		await this.adminRepository.updateElectionResearch(ctx, electionResearch);
		
		const elector = Elector.makeElector(cpf, electionResearch.getId(), candidate);
			
		await this.electorRepository.registerElector(ctx, elector);
	}	

	async searchElector(ctx, yearElectionResearch, monthElectionResearch, cpf) {
		const electionResearch = ElectionResearch.makeElectionResearch(yearElectionResearch, monthElectionResearch);
		
		const elector = Elector.makeElector(cpf, electionResearch.getId());
		
		const electorBuffer = await this.electorRepository.retrieveElector(ctx, elector);
		return JSON.parse(electorBuffer.toString());
	}

	async searchElectionResearch(ctx, yearElectionResearch, monthElectionResearch) {
		const electionResearch = ElectionResearch.makeElectionResearch(yearElectionResearch, monthElectionResearch);
		
		const electionResearchBuffer = await this.adminRepository.retrieveElectionResearch(ctx, electionResearch);
		
		return JSON.parse(electionResearchBuffer.toString());		
	}

}

module.exports = ElectorService;