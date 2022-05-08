const FabricCAServices = require("fabric-ca-client");
const { buildCCPOrg } = require("./AppUtil");

class CertificateAuthorityMain {
	constructor(caHostName, orgMspId, affiliation, adminUserId, adminUserPasswd) {
		this.caHostName = caHostName;
		this.orgMspId = orgMspId;
		this.affiliationName = affiliation;
		this.adminUserId = adminUserId;
		this.adminUserPasswd = adminUserPasswd;
		this.ccp = buildCCPOrg();
	}

	async enrollAdmin(walletInstance) {
		const caClientInstance = this.buildCAClient();

		const identity = await walletInstance.get(this.adminUserId);

		if (identity) {      
			return;
		}


		const enrollment = await caClientInstance.enroll({
			enrollmentID: this.adminUserId,
			enrollmentSecret: this.adminUserPasswd,
		});

		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: this.orgMspId,
			type: "X.509",
		};

		await walletInstance.put(this.adminUserId, x509Identity);    
	}

	buildCAClient() {
		const caInfo = this.ccp.certificateAuthorities[this.caHostName];
		const caTLSCACerts = caInfo.tlsCACerts.pem;

		const caClientInstance = new FabricCAServices(
			caInfo.url,
			{ trustedRoots: caTLSCACerts, verify: false },
			caInfo.caName
		);

		return caClientInstance;
	}

	async enrollUser(walletInstance, userId, secret) {
		const caClientInstance = this.buildCAClient();

		const userIdentity = await walletInstance.get(userId);

		if (userIdentity) {      
			return;
		}

		const enrollment = await caClientInstance.enroll({
			enrollmentID: userId,
			enrollmentSecret: secret,
		});

		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: this.orgMspId,
			type: "X.509",
		};

		await walletInstance.put(userId, x509Identity);    
	}
}

module.exports = CertificateAuthorityMain;
