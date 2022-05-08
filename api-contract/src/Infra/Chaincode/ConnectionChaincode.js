const { Gateway } = require("fabric-network");
const { buildCCPOrg } = require("./AppUtil");
const process = require("dotenv").config();

const chaincodeName = process.parsed.CHAINCODE_NAME;
const channelName = process.parsed.CHANNEL_NAME;

const ContractConnectionError = require("../../App/Exception/Chaincode/ContractConnectionError");

class ConnectionChaincode {
	constructor() {
		this.ccp = buildCCPOrg();
	}

	async connect(walletInstance, identity) {
		const gateway = new Gateway();

		try {
			await gateway.connect(this.ccp, {
				wallet: walletInstance,
				identity: identity,
				discovery: { enabled: true, asLocalhost: true },
			});

			const network = await gateway.getNetwork(channelName);

			const chaincode = network.getContract(chaincodeName);

			return chaincode;

		} catch (error) {
			console.error(error);
			throw new ContractConnectionError();
		}
	}
}

module.exports = ConnectionChaincode;
