const {buildCCPOrg, buildWallet} = require("./Infra/Chaincode/AppUtil");
const OrganizationOneCertificateAuthority = require("./Infra/Chaincode/OrganizationOneCertificateAuthority");
const ConnectionChaincode = require("./Infra/Chaincode/ConnectionChaincode");
const process = require("dotenv").config();

const contractAdminIdenitityUsername = process.parsed.CONTRACT_ADMIN_IDENTITY_USERNAME;
const contractAdminIdentityPassword = process.parsed.CONTRACT_ADMIN_IDENTITY_PASSWORD;
const contractElectorIdentityUsername = process.parsed.CONTRACT_ELECTOR_IDENTITY_USERNAME;
const contractElectorIdentityPassword = process.parsed.CONTRACT_ELECTOR_IDENTITY_PASSWORD;

const IdentityAlreadyExists = require("./App/Exception/Chaincode/IdentityAlreadyExists");

const boot = async () => {
    buildCCPOrg();

    const wallet = await buildWallet();

    const orgOne = new OrganizationOneCertificateAuthority();
    await orgOne.enrollAdmin(wallet);
    
    try {
        await orgOne.registerNewElectionResearchAdmin(wallet, contractAdminIdenitityUsername, contractAdminIdentityPassword);
        await orgOne.enrollUser(wallet, contractAdminIdenitityUsername, contractAdminIdentityPassword);        

    } catch(error) {               
        if(!error instanceof IdentityAlreadyExists) {
            throw error;
        }
    }

    try {
        await orgOne.registerNewElector(wallet , contractElectorIdentityUsername, contractElectorIdentityPassword);
        await orgOne.enrollUser(wallet, contractElectorIdentityUsername, contractElectorIdentityPassword);
    
    } catch(error) {        
        if(!error instanceof IdentityAlreadyExists) {
            throw error;
        }
    }

    const connection = new ConnectionChaincode();
    await connection.connect(wallet, contractAdminIdenitityUsername);

    connection.disconnect();
};

const bootstrap = (() => {
    boot()
        .then(() => console.log("Application successfully initialized"))
        .catch(error => console.log("Application error initialized: ", error));
});

module.exports = bootstrap;