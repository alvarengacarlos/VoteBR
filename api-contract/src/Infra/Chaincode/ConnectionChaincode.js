const { Gateway } = require("fabric-network");
const { buildCCPOrg } = require("./AppUtil");
const process = require("dotenv").config();

const chaincodeName = process.parsed.CONTRACT_CHAINCODE_NAME;
const channelName = process.parsed.CONTRACT_CHANNEL_NAME;

const ContractConnectionError = require("../../App/Exception/Chaincode/ContractConnectionError");

class ConnectionChaincode {
	constructor() {
		this.ccp = buildCCPOrg();
		this.gateway = null;
	}

	async connect(walletInstance, identity) {
		this.gateway = new Gateway();

		try {
			await this.gateway.connect(this.ccp, {
				wallet: walletInstance,
				identity: identity,
				discovery: { enabled: true, asLocalhost: true },
			});

			const network = await this.gateway.getNetwork(channelName);

			const chaincode = network.getContract(chaincodeName);

			return chaincode;

		} catch (error) {
			console.error(error);
			throw new ContractConnectionError();
		}
	}

	disconnect() {
		this.gateway.disconnect();
	}
}

module.exports = ConnectionChaincode;
