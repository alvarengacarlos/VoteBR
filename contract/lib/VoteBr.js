const { Contract } = require("fabric-contract-api");

const AdminValidation = require("./Validation/AdminValidation");
const AdminService = require("./Service/AdminService");
const AccessDenied = require("./Exceptions/AccessDenied");
const AdminRepository = require("./Repository/AdminRepository");

class VoteBr extends Contract {
    
	async createElectionResearch(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateCreateElectionResearch(year, month);
		
		const adminRepository = new AdminRepository();

		const adminService = new AdminService();
		await adminService.createElectionResearch(ctx, adminRepository, year, month);
	}

	async insertCandidateInTheElectionResearch(ctx, name, numberOfCandidate) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateInsertCandidateInTheElectionResearch(name, numberOfCandidate);

		const adminRepository = new AdminRepository();

		const adminService = new AdminService();
		await adminService.insertCandidateInTheElectionResearch(ctx, adminRepository, name, numberOfCandidate);
	}

	async beginCollectingVotes(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminRepository = new AdminRepository();

		const adminService = new AdminService();
		await adminService.beginCollectingVotes(ctx, adminRepository);
	}
	
	async finishCollectingVotesAndElectionResearch(ctx) {
		this._checkAuthorityAdmin(ctx);

		const adminRepository = new AdminRepository();

		const adminService = new AdminService();
		await adminService.finishCollectingVotesAndElectionResearch(ctx, adminRepository);
	}

	_checkAuthorityAdmin(ctx) {
		const identity = ctx.clientIdentity;
		
		const checkAuthority = identity.assertAttributeValue("ADMIN", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}
    
}

module.exports = VoteBr;