const SubmitTransactionException = require("../Exception/Chaincode/SubmitTransactionException");
const EvaluateTransactionException = require("../Exception/Chaincode/EvaluateTransactionException");

class ElectionResearchContractRepository {

    async createElectionResearch(chaincode, year, month) {
        try {
            await chaincode.submitTransaction("createElectionResearch", year, month);

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async insertCandidateInTheElectionResearch(chaincode, candidateName, candidateNumber, photoUrl) {
        try {
            await chaincode.submitTransaction("insertCandidateInTheElectionResearch", candidateName, candidateNumber, photoUrl);

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async removeCandidateOfElectionResearch(chaincode, candidateNumber) {
        try {
            await chaincode.submitTransaction("removeCandidateOfElectionResearch", candidateNumber);

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async beginCollectingVotes(chaincode) {
        try {
            await chaincode.submitTransaction("beginCollectingVotes");

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async finishElectionResearchAndCollectingVotes(chaincode) {
        try {
            await chaincode.submitTransaction("finishElectionResearchAndCollectingVotes");

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async searchElectionResearch(chaincode, year, month) {
        try {
            const result = await chaincode.evaluateTransaction("retrieveElectionResearch", year, month);

            return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        }
    }

    async searchElectionResearchWithoutStarting(chaincode) {
        try {
            const result = await chaincode.evaluateTransaction("retrieveElectionResearchWithoutStarting");

            return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        }
    }

    async searchElectionResearchInProgress(chaincode) {
        try {
            const result = await chaincode.evaluateTransaction("retrieveElectionResearchInProgress");

            return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        }
    }

    async searchElectionResearchClosed(chaincode) {
        try {
            const result = await chaincode.evaluateTransaction("retrieveElectionResearchClosed");

            return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        }
    }
}

module.exports = ElectionResearchContractRepository