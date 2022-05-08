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

    async finishElectionResearchInBlockchain(payload) {
        //Chamar contrato
    }

    async searchElectionResearchLikeAdminInBlockchain(payload) {
        const year = payload.year;
        const month = payload.month;
        //Chamar contrato
    }

    async searchElectionResearchWithoutStartingLikeAdminInBlockchain() {
        //Chamar contrato                
        return [
            {
            "candidatesList": [{"id":"01","name":"Fulano","totalOfVotes":0}, {"id":"01","name":"Fulano","totalOfVotes":0}],
            "createIn":"Sat May 07 2022 20:35:39 GMT+0000 (Coordinated Universal Time)",
            "finishIn":null,
            "id":"2000-01",
            "isClose":false,
            "isStart":false,
            "startIn":null,
            "totalOfVotes":0
            },
        ];
    }

    async searchElectionResearchInProgressLikeAdminInBlockchain() {
        //Chamar contrato
        return [{name: "em progresso"}];
    }

    async searchElectionResearchClosedLikeAdminInBlockchain() {
        //Chamar contrato
        return [{name: "Fechada"}];
    }
}

module.exports = Admin;