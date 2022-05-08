const CertificateAuthorityMain = require("./CertificateAuthorityMain");
const process = require("dotenv").config();

const IdentityAlreadyExists = require("../../App/Exception/Chaincode/IdentityAlreadyExists");
const AdminIdentityDoesNotExistsInTheWallet = require("../../App/Exception/Chaincode/AdminIdentityDoesNotExistInTheWallet");

class OrganizationOneCertificateAuthority extends CertificateAuthorityMain {
	constructor() {
		const caHostName = process.parsed.CONTRACT_CA_HOSTNAME;
		const orgMspId = process.parsed.CONTRACT_ORG_MSP_ID;
		const affiliationName = process.parsed.CONTRACT_AFFILIATION_NAME;
		const adminUserId = process.parsed.CONTRACT_ORG_ADMIN_USER;
		const adminUserPasswd = process.parsed.CONTRACT_ORG_ADMIN_PASSWD;

		super(caHostName, orgMspId, affiliationName, adminUserId, adminUserPasswd);
	}

	async registerNewElector(walletInstance, userId, secret) {
		const caClientInstance = this.buildCAClient();

		const adminUser = await this.checkWalletAndReturnAdminIdentity(walletInstance, userId);

		const info = {
			affiliation: this.affiliationName,
			enrollmentID: userId,
			enrollmentSecret: secret,
			maxEnrollments: 0,
			role: "client",
			attrs: [{ name: "ELECTOR", value: "false", ecert: true }],
		};

		await caClientInstance.register(info, adminUser);
	}

	async checkWalletAndReturnAdminIdentity(walletInstance, userId) {
		const userIdentity = await walletInstance.get(userId);
		if (userIdentity) {
			throw new IdentityAlreadyExists();
		}

		const adminIdentity = await walletInstance.get(this.adminUserId);
		if (!adminIdentity) {      
			throw new AdminIdentityDoesNotExistsInTheWallet();
		}

		const provider = walletInstance.getProviderRegistry()
			.getProvider(adminIdentity.type);

		const adminUser = await provider.getUserContext(adminIdentity, this.adminUserId);

		return adminUser;
	}

	async registerNewElectionResearchAdmin(walletInstance, userId, secret) {
		const caClientInstance = this.buildCAClient();

		const adminUser = await this.checkWalletAndReturnAdminIdentity(walletInstance, userId);
    
		const info = {
			affiliation: this.affiliationName,
			enrollmentID: userId,
			enrollmentSecret: secret,
			maxEnrollments: 0,
			role: "client",
			attrs: [{ name: "ADMIN", value: "true", ecert: true }],
		};

		await caClientInstance.register(info, adminUser);
	}
}

module.exports = OrganizationOneCertificateAuthority;
