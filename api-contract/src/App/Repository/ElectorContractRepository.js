const SubmitTransactionException = require("../Exception/Chaincode/SubmitTransactionException");
const EvaluateTransactionException = require("../Exception/Chaincode/EvaluateTransactionException");

class ElectorContractRepository {
    
    async vote(chaincode, cpfHashing, candidateNumber, secretPhrase) {
        try {
            await chaincode.submitTransaction("vote", cpfHashing, candidateNumber, secretPhrase);

        } catch (exception) {
            throw new SubmitTransactionException(exception);
        }
    }

    async searchElector(chaincode, yearElection, monthElection, cpfHashing, secretPhrase) {
        try {
            const result = await chaincode.evaluateTransaction("searchElector", yearElection, monthElection, cpfHashing, secretPhrase);
			return JSON.parse(result.toString());

        } catch (exception) {            
            console.log(exception.message)
            throw new EvaluateTransactionException(exception);
        } 
    }

    async searchElectionResearchInProgress(chaincode) {
        try {
            const result = await chaincode.evaluateTransaction("searchElectionResearchInProgress");
			return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        } 
    }

    async searchElectionResearchClosed(chaincode) {
        try {
            const result = await chaincode.evaluateTransaction("searchElectionResearchClosed");
			return JSON.parse(result.toString());

        } catch (exception) {
            throw new EvaluateTransactionException(exception);
        } 
    }

}

module.exports = ElectorContractRepository;