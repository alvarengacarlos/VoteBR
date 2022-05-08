class Admin {

    async createElectionResearchInBlockchain(payload) {
        const year = String(payload.year);
        const month = String(payload.month);

        //Chamar contrato
    }

    async insertCandidateInTheElectionResearchInBlockchain(payload) {
        const nameOfCandidate = String(payload.nameOfCandidate);
        const numberOfCandidate = String(payload.numberOfCandidate);

        //Chamar contrato
    }

    async removeCandidateOfElectionResearchInBlockchain(payload) {
        const numberOfCandidate = String(payload.numberOfCandidate);

        //Chamar contrato
    }

    async beginCollectingVotesInBlockchain() {
        //Chamar contrato
    }

    async finishElectionResearchInBlockchain() {
        //Chamar contrato
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