const { Contract } = require("fabric-contract-api");
const AccessDenied = require("./Exceptions/AccessDenied");

class ContractBase extends Contract {

	constructor(contractName = "ContractBase") {
		super(contractName);
	}

	_checkAuthorityAdmin(ctx) {
		const identity = ctx.clientIdentity;
		
		const checkAuthority = identity.assertAttributeValue("ADMIN", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}
    
	_checkAuthorityElector(ctx) {
		const identity = ctx.clientIdentity;

		const checkAuthority = identity.assertAttributeValue("ELECTOR", "true");
		if (checkAuthority !== true) {
			throw new AccessDenied();
		}
	}

}

module.exports = ContractBase;