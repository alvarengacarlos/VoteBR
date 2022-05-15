const { Contract } = require("fabric-contract-api");


const AccessDenied = require("./Exceptions/AccessDenied");

const AdminValidation = require("./Validation/AdminValidation");
const ElectorValidation = require("./Validation/ElectorValidation");
const AdminService = require("./Services/AdminService");
const ElectorService = require("./Services/ElectorService");

class VoteBr extends Contract {
	//Admin Features
	async createElectionResearch(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateCreateElectionResearch(year, month);
	

		const adminService = new AdminService();
		await adminService.createElectionResearch(ctx, year, month);
	}

	async insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate, photoUrl) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate, photoUrl);

		const adminService = new AdminService();
		await adminService.insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate, photoUrl);
	}

	async removeCandidateOfElectionResearch(ctx, numberOfCandidate) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateRemoveCandidateOfElectionResearch(numberOfCandidate);

		const adminService = new AdminService();
		await adminService.removeCandidateOfElectionResearch(ctx, numberOfCandidate);
	}

	async beginCollectingVotes(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminService = new AdminService();
		await adminService.beginCollectingVotes(ctx);
	}
	
	async finishElectionResearch(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminService = new AdminService();
		await adminService.finishElectionResearch(ctx);
	}

	async searchElectionResearchLikeAdmin(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateSearchElectionResearchLikeAdmin(year, month);

		const adminService = new AdminService();
		return await adminService.searchElectionResearch(ctx, year, month);
	}

	async searchElectionResearchWithoutStartingLikeAdmin(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminService = new AdminService();
		return await adminService.searchElectionResearchWithoutStarting(ctx);
	}

	async searchElectionResearchInProgressLikeAdmin(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminService = new AdminService();
		return await adminService.searchElectionResearchInProgress(ctx);
	}

	async searchElectionResearchClosedLikeAdmin(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminService = new AdminService();
		return await adminService.searchElectionResearchClosed(ctx);
	}

	_checkAuthorityAdmin(ctx) {
		const identity = ctx.clientIdentity;
		
		const checkAuthority = identity.assertAttributeValue("ADMIN", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}

	//User Features
	async vote(ctx, cpfHashing, numberOfCandidate) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateVote(cpfHashing, numberOfCandidate);

		const electorService = new ElectorService();
		await electorService.vote(ctx, cpfHashing, numberOfCandidate);
	}

	async searchElector(ctx, yearElectionResearch, monthElectionResearch, cpfHashing) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpfHashing);
	
		const electorService = new ElectorService();
		return await electorService.searchElector(ctx, yearElectionResearch, monthElectionResearch, cpfHashing);
	}

	async searchElectionResearchInProgressLikeElector(ctx) {
		this._checkAuthorityElector(ctx);

		const electorService = new ElectorService();
		return await electorService.searchElectionResearchInProgress(ctx);
	}

	async searchElectionResearchClosedLikeElector(ctx) {
		this._checkAuthorityElector(ctx);

		const electorService = new ElectorService();
		return await electorService.searchElectionResearchClosed(ctx);
	}

	_checkAuthorityElector(ctx) {
		const identity = ctx.clientIdentity;
		
		const checkAuthority = identity.assertAttributeValue("ELECTOR", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}
}

module.exports = VoteBr;