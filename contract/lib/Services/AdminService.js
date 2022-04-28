const ElectionResearch = require("../Classes/Admin/ElectionResearch");
const Candidate = require("../Classes/Admin/Candidate");

const ElectionResearchWithoutStartingExist = require("../Exceptions/Admin/ElectionResearch/ElectionResearchWithoutStartingExist");
const ElectionResearchInProgress = require("../Exceptions/Admin/ElectionResearch/ElectionResearchInProgress");
const ElectionResearchNotFound = require("../Exceptions/Admin/ElectionResearch/ElectionResearchNotFound");

class AdminService {
    
    async createElectionResearch(ctx, adminRepository, year, month) {                                        
        const electionResearchWithoutStarting = await adminRepository.retrieveElectionResearchWithoutStarting(ctx);    
        if (electionResearchWithoutStarting.length != 0) {
            throw new ElectionResearchWithoutStartingExist();
        }
        
        const electionResearchInProgress = await adminRepository.retrieveElectionResearchInProgress(ctx);
        if (electionResearchInProgress.length != 0) {
            throw new ElectionResearchInProgress();
        }

        const electionResearch = ElectionResearch.makeElectionResearch(year, month);

        await adminRepository.createElectionResearch(ctx, electionResearch);        
    }

    async insertCandidateInTheElectionResearch(ctx, adminRepository, name, numberOfCandidate) {
        const electionResearchWithoutStarting = adminRepository.retrieveElectionResearchWithoutStarting(ctx);
        if (electionResearchWithoutStarting.length == 0) {
            throw new ElectionResearchNotFound();
        }        

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchWithoutStarting[0]);
        
        const candidate = Candidate.makeCandidate(name, numberOfCandidate);
        electionResearch.insertCandidate(candidate);
        
        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

    async beginCollectingVotes(ctx, adminRepository) {
        const electionResearchWithoutStarting = adminRepository.retrieveElectionResearchWithoutStarting(ctx);
        if (electionResearchWithoutStarting.length == 0) {
            throw new ElectionResearchNotFound();
        } 

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchWithoutStarting[0]);

        electionResearch.beginCollectingVotes();

        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

    async finishElectionResearch(ctx, adminRepository) {
        const electionResearchInProgress = await adminRepository.retrieveElectionResearchInProgress(ctx);
        if (electionResearchInProgress.length == 0) {
            throw new ElectionResearchNotFound();
        }

        const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(electionResearchInProgress[0]);

        electionResearch.finishElectionResearch();

        await adminRepository.updateElectionResearch(ctx, electionResearch);
    }

}

module.exports = AdminService;