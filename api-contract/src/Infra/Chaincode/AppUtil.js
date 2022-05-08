const { Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
const process = require("dotenv").config();

const CcpNotFound = require("../../App/Exception/Bootstrap/CcpNotFound");

const buildCCPOrg = () => {  
	const absolutePathCcp = process.parsed.CONTRACT_CCP_ABSOLUTE_PATH;  

	const ccpPath = path.resolve(absolutePathCcp);
  
	const fileExists = fs.existsSync(ccpPath);
  

	if (!fileExists) {
		throw new CcpNotFound();
	}

	const contents = fs.readFileSync(ccpPath, "utf8");

	const ccp = JSON.parse(contents);

	return ccp;
};

const buildWallet = async () => {
  
	const walletPath = path.join(__dirname, "..", "..", "..", "wallet");  

	const wallet = await Wallets.newFileSystemWallet(walletPath);

	return wallet;
};

module.exports = { buildCCPOrg, buildWallet };
