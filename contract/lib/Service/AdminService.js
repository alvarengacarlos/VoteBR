const ElectionResearch = require("../Classes/ElectionResearch");

const Candidate = require("../Classes/Candidate");

const ElectionResearchWithoutStartingDoesNotExist = require("../Exceptions/ElectionResearchWithoutStartingDoesNotExist");
const ElectionResearchWithoutStartingExist = require("../Exceptions/Admin/ElectionResearchWithoutStartingExist");
const ElectionResearchStartedExist = require("../Exceptions/ElectionResearchStartedExist");

class AdminService {
    
    async createElectionResearch(ctx, adminRepository, year, month) {                                        
        const electionResearchWithoutStarting = await adminRepository.retrieveElectionResearchWithoutStarting(ctx);    
        if (electionResearchWithoutStarting.length != 0) {
            throw new ElectionResearchWithoutStartingExist();
        }
        
        const electionResearchStarted = await adminRepository.retrieveElectionResearchStarted(ctx);
        if (electionResearchStarted.length != 0) {
            throw new ElectionResearchStartedExist();
        }

        const electionResearch = ElectionResearch.makeElectionResearch(year, month);

        await adminRepository.createElectionResearch(ctx, electionResearch);        
    }

    async insertCandidateInTheElectionResearch(ctx, adminRepository, name, numberOfCandidate) {
        const electionResearchStarted = await adminRepository.retrieveElectionResearchStarted(ctx);
        if (electionResearchStarted.length != 0) {
            throw new ElectionResearchStartedExist();
        }
        
        const electionResearchWithoutStarting = adminRepository.retrieveElectionResearchWithoutStarting(ctx);
        if (electionResearchWithoutStarting.length == 0) {
            throw new ElectionResearchWithoutStartingDoesNotExist();
        }        

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchWithoutStarting[0]);
        
        const candidate = Candidate.makeCandidate(name, numberOfCandidate);
        electionResearch.insertCandidate(candidate);
        
        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

    async beginCollectingVotes(ctx, adminRepository) {
        const electionResearchWithoutStarting = adminRepository.retrieveElectionResearchWithoutStarting(ctx);
        if (electionResearchWithoutStarting.length == 0) {
            throw new ElectionResearchWithoutStartingDoesNotExist();
        } 

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchWithoutStarting[0]);

        electionResearch.beginCollectingVotes();

        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

    async finishCollectingVotesAndElectionResearch(ctx, adminRepository) {
        const electionResearchStarted = await adminRepository.retrieveElectionResearchStarted(ctx);
        if (electionResearchStarted.length != 0) {
            throw new ElectionResearchStartedExist();
        }

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchStarted[0]);

        electionResearch.finishCollectingVotesAndElectionResearch();

        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

}

module.exports = AdminService;