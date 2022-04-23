const ExistingRecord = require("../Exceptions/ExistingRecord");
const Serializer = require("./Serializer");
const CandidateDoesNotExist = require("../Exceptions/CandidateDoesNotExist");
const Candidate = require("./Candidate");

class ElectionResearch extends Serializer {
    //TODO: Enquanto a pesquisa não for iniciada é possível adicionar e remover os candidatos.
    // Depois que for inicada não deve ser mais possível. Nem mesmo depois de ser finalizada
    constructor(id) {
        super();
        this.id = id;
        this.candidatesList = [];
        this.start = null;
        this.close = null;
        this.createIn = new Date().toString();
        this.finishIn = null;
    }

    static makeElectionResearch(year, month) {        
        const id = `${year}-${month}`;
        
        return new ElectionResearch(id);
    }

    getId() {
        return this.id;
    }

    insertCandidates(candidate) {
        for (const c of this.candidatesList) {                         
            if(c.getId() == candidate.getId()) {
                throw new ExistingRecord();
            }
        }      

        this.candidatesList.push(candidate);
    }

    getCandidate(numberOfCandidate) {
        for (const candidate of this.candidatesList) {                         
            if(numberOfCandidate == candidate.getId()) {
                return Candidate.makeCandidate(candidate.getName(), candidate.getId(), candidate.getTotalOfVotes());
            }
        }  
        
        throw new CandidateDoesNotExist();
    }

}

module.exports = ElectionResearch;