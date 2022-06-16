const GeneralContractException = require("../Exception/Chaincode/GeneralContractException");

class ElectorContractRepository {
    
    async vote(chaincode, cpfHashing, candidateNumber, secretPhrase) {
        try {
            await chaincode.submitTransaction("vote", cpfHashing, candidateNumber, secretPhrase);

        } catch (exception) {
            throw new GeneralContractException(exception);
        }
    }

    async searchElector(chaincode, yearElection, monthElection, cpfHashing, secretPhrase) {
        try {
            const result = await chaincode.submitTransaction("searchElector", yearElection, monthElection, cpfHashing, secretPhrase);
			return JSON.parse(result.toString());

        } catch (exception) {
            throw new GeneralContractException(exception);
        } 
    }

    async searchElectionResearchInProgress(chaincode) {
        try {
            const result = await chaincode.submitTransaction("searchElectionResearchInProgress");
			return JSON.parse(result.toString());

        } catch (exception) {
            throw new GeneralContractException(exception);
        } 
    }

    async searchElectionResearchClosed(chaincode) {
        try {
            const result = await chaincode.submitTransaction("searchElectionResearchClosed");
			return JSON.parse(result.toString());

        } catch (exception) {
            throw new GeneralContractException(exception);
        } 
    }

}

module.exports = ElectorContractRepository;