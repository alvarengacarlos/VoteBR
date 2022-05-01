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

	async insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate);

		const adminService = new AdminService();
		await adminService.insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate);
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

	_checkAuthorityAdmin(ctx) {
		const identity = ctx.clientIdentity;
		
		const checkAuthority = identity.assertAttributeValue("ADMIN", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}

	//User Features
	async vote(ctx, cpf, numberOfCandidate) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateVote(cpf, numberOfCandidate);

		const electorService = new ElectorService();
		await electorService.vote(ctx, cpf, numberOfCandidate);
	}

	async searchElector(ctx, yearElectionResearch, monthElectionResearch, cpf) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpf);
	
		const electorService = new ElectorService();
		return await electorService.searchElector(ctx, yearElectionResearch, monthElectionResearch, cpf);
	}

	async searchElectionResearchLikeElector(ctx, year, month) {
		this._checkAuthorityElector(ctx);

		const electorValidation = new ElectorValidation();
		electorValidation.validateSearchElectionResearchLikeElector(year, month);

		const electorService = new ElectorService();
		return await electorService.searchElectionResearch(ctx, year, month);
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