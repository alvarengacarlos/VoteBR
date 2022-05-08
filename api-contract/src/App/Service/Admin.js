const ConnectionChaincode = require("../../Infra/Chaincode/ConnectionChaincode");
const {buildWallet} = require("../../Infra/Chaincode/AppUtil");
const process = require("dotenv").config();
const CONTRACT_ADMIN_IDENTITY_USERNAME = process.parsed.CONTRACT_ADMIN_IDENTITY_USERNAME;

const GeneralContractException = require("../Exception/Chaincode/GeneralContractException");

class Admin {

    async createElectionResearchInBlockchain(payload) {
        const year = String(payload.yearElection);
        const month = String(payload.monthElection);
       
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connect(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        try {
            await chaincode.submitTransaction("createElectionResearch", year, month);
        
        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async insertCandidateInTheElectionResearchInBlockchain(payload) {
        const nameOfCandidate = String(payload.nameOfCandidate);
        const numberOfCandidate = String(payload.numberOfCandidate);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connect(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        try {
            await chaincode.submitTransaction("insertCandidateInTheElectionResearch", nameOfCandidate, numberOfCandidate);
        
        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async removeCandidateOfElectionResearchInBlockchain(payload) {
        const numberOfCandidate = String(payload.numberOfCandidate);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connect(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        try {
            await chaincode.submitTransaction("removeCandidateOfElectionResearch", numberOfCandidate);
        
        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async beginCollectingVotesInBlockchain() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connect(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        try {
            await chaincode.submitTransaction("beginCollectingVotes");
        
        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async finishElectionResearchInBlockchain() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connect(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        try {
            await chaincode.submitTransaction("finishElectionResearch");
        
        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async searchElectionResearchLikeAdminInBlockchain(payload) {
        const year = String(payload.year);
        const month = String(payload.month);
        //Chamar contrato
    }

    async searchElectionResearchWithoutStartingLikeAdminInBlockchain() {
        //Chamar contrato                        
    }

    async searchElectionResearchInProgressLikeAdminInBlockchain() {
        //Chamar contrato        
    }

    async searchElectionResearchClosedLikeAdminInBlockchain() {
        //Chamar contrato       
    }
}

module.exports = Admin;