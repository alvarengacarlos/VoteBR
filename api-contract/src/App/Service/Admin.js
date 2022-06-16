const ConnectionChaincode = require("../../Infra/Chaincode/ConnectionChaincode");
const { buildWallet } = require("../../Infra/Chaincode/AppUtil");
const process = require("dotenv").config();
const CONTRACT_ADMIN_IDENTITY_USERNAME = process.parsed.CONTRACT_ADMIN_IDENTITY_USERNAME;

const ElectionResearchContractRepository = require("../Repository/ElectionResearchContractRepository");

class Admin {

    constructor() {
        this.contractRepository = new ElectionResearchContractRepository();
        this.connectionChaincode = new ConnectionChaincode();
    }

    async createElectionResearch(payload) {
        const year = String(payload.year);
        const month = String(payload.month);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        await this.contractRepository.createElectionResearch(chaincode, year, month);
    }

    async insertCandidateInTheElectionResearch(payload) {
        const candidateName = String(payload.candidateName);
        const candidateNumber = String(payload.candidateNumber);
        const photoUrl = String(payload.photoUrl);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        await this.contractRepository.insertCandidateInTheElectionResearch(chaincode, candidateName, candidateNumber, photoUrl);
    }

    async removeCandidateOfElectionResearch(payload) {
        const candidateNumber = String(payload.candidateNumber);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        await this.contractRepository.removeCandidateOfElectionResearch(chaincode, candidateNumber);
    }

    async beginCollectingVotes() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        await this.contractRepository.beginCollectingVotes(chaincode);
    }

    async finishElectionResearch() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        await this.contractRepository.finishElectionResearch(chaincode);
    }

    async searchElectionResearch(payload) {
        const year = String(payload.year);
        const month = String(payload.month);

        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearch(chaincode, year, month));
    }

    async searchElectionResearchWithoutStarting() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearchWithoutStarting(chaincode));
    }

    async searchElectionResearchInProgress() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearchInProgress(chaincode));
    }

    async searchElectionResearchClosed() {
        const wallet = await buildWallet();

        const connection = new ConnectionChaincode();
        const chaincode = await connection.connectAdminContract(wallet, CONTRACT_ADMIN_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearchClosed(chaincode));
    }
}

module.exports = Admin;