class Admin {
    async createElectionResearch(payload) {
        const year = payload.year;
        const month = payload.month;

        //Chamar contrato
    }

    async insertCandidateInTheElectionResearch(payload) {
        const nameOfCandidate = payload.nameOfCandidate;
        const numberOfCandidate = payload.numberOfCandidate;

        //Chamar contrato
    }

    async removeCandidateOfElectionResearch(payload) {
        const numberOfCandidate = payload.numberOfCandidate;

        //Chamar contrato
    }

    async beginCollectingVotes(payload) {
        //Chamar contrato
    }

    async finishElectionResearch(payload) {
        //Chamar contrato
    }

    async searchElectionResearchLikeAdmin(payload) {
        const year = payload.year;
        const month = payload.month;
        //Chamar contrato
    }
}

module.exports = Admin;