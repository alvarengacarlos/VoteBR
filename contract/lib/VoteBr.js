const { Contract } = require("fabric-contract-api");

const AdminValidation = require("./Validation/AdminValidation");
const AdminService = require("./Service/AdminService");
const AccessDenied = require("./Exceptions/AccessDenied");

class VoteBr extends Contract {
    
	async createElectionResearch(ctx, year, month) {
		this._checkAuthorityAdmin(ctx);

		const adminValidation = new AdminValidation();
		adminValidation.validateCreateElectionResearch(year, month);
		
		const adminService = new AdminService();
		await adminService.createElectionResearch(ctx, year, month);
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