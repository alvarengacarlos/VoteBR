const ContractBase = require("./ContractBase");
const ElectorValidation = require("./Validation/ElectorValidation");
const ElectorRepository = require("./Repository/ElectorRepository");
const ElectionResearchRepository = require("./Repository/ElectionResearchRepository");

const process = require("dotenv").config();
const VOTE_LIMIT = Number(process.parsed.VOTE_LIMIT);

//Classes
const Elector = require("./Classes/Elector/Elector");
const ElectionResearch = require("./Classes/Admin/ElectionResearch");

//Exceptions
const TotalVotesAchieved = require("./Exceptions/Elector/TotalVotesAchieved");
const ElectionResearchNotFound = require("./Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

class ElectorContract extends ContractBase {

	constructor() {
		super("ElectorContract");
		this.validation = new ElectorValidation();
		this.repository = new ElectorRepository();
		this.electionResearchRepository = new ElectionResearchRepository();
		this.VOTE_LIMIT = VOTE_LIMIT || Number(147918483);	
	}

	async vote(ctx, cpfHashing, candidateNumber, secretPhrase) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateVote(cpfHashing, candidateNumber, secretPhrase);

		const electionResearchInProgressList = await this.electionResearchRepository.retrieveElectionResearchInProgress(ctx);
		if (electionResearchInProgressList.length == 0) {
			throw new ElectionResearchNotFound();
		}
		
		const electionResearch = ElectionResearch.mountsElectionResearchObjectRetrievedFromTheBlockchain(electionResearchInProgressList[0]);
		
		if (electionResearch.getTotalOfVotes() > this.VOTE_LIMIT) {
			throw new TotalVotesAchieved();
		}

		const candidate = electionResearch.getCandidateByNumber(candidateNumber);
		candidate.addOneVote();
		electionResearch.addOneVote();
		electionResearch.updateCandidate(candidate);

		await this.electionResearchRepository.updateElectionResearch(ctx, electionResearch);
		
		const elector = Elector.makeElector(cpfHashing, electionResearch.getId(), candidate, secretPhrase);
			
		await this.repository.registerElector(ctx, elector);
	}

	async searchElector(ctx, yearElectionResearch, monthElectionResearch, cpfHashing, secretPhrase) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpfHashing, secretPhrase);

		const electionResearch = ElectionResearch.makeElectionResearch(yearElectionResearch, monthElectionResearch);
		
		const elector = Elector.makeElector(cpfHashing, electionResearch.getId());
		
		const electorBuffer = await this.repository.retrieveElector(ctx, elector);
		
		const electorResult = Elector.mountsElectorObjectRetrievedFromTheBlockchain(JSON.parse(electorBuffer.toString()));
		electorResult.compareSecretPhraseAndThrowException(secretPhrase);

		return electorResult;
	}

	async searchElectionResearchInProgress(ctx) {
		this._checkAuthorityElector(ctx);

		const electionResearchInProgressList = await this.electionResearchRepository.retrieveElectionResearchInProgress(ctx);

		return electionResearchInProgressList;
	}

	async searchElectionResearchClosed(ctx) {
		this._checkAuthorityElector(ctx);

		const electionResearchClosedList = await this.electionResearchRepository.retrieveElectionResearchClosed(ctx);

		return electionResearchClosedList;
	}   

}

module.exports = ElectorContract;