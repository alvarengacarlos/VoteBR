const ExistingRecord = require("../Exceptions/ExistingRecord");

class AdminRepository {
    async createElectionResearch(ctx, electionResearch) {        
        const electionResearchExists = await this.electionResearchExists(ctx, electionResearch.getId());
        if (electionResearchExists) {
            throw new ExistingRecord();
        }

        await ctx.stub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
    }
    
    async electionResearchExists(ctx, electionResearchId) {
        const buffer = await ctx.stub.getState(electionResearchId);
        return !!buffer && buffer.length > 0;
    }
}

module.exports = AdminRepository;