const ExistingRecord = require("../Exceptions/ExistingRecord");
const NotExistsRecord = require("../Exceptions/NotExistingRecord");

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

    async retrieveElectionResearch(ctx, electionResearch) {
        const electionResearchExists = await this.electionResearchExists(ctx, electionResearch.getId());
        if (!electionResearchExists) {
            throw new NotExistsRecord();
        }

        return await ctx.stub.getState(electionResearch.getId());        
    }

    async updateElectionResearch(ctx, electionResearch) {
        const electionResearchExists = await this.electionResearchExists(ctx, electionResearch.getId());
        if (!electionResearchExists) {
            throw new NotExistsRecord();
        }

        await ctx.stub.putState(electionResearch.getId(), electionResearch.serializerInBuffer());
    }

    async retrieveElectionResearchWithoutStarting(ctx) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.start = false;
		queryString.selector.close = false;        

        const resultsArray = await this._getQueryResultForQueryString(ctx, JSON.stringify(queryString));

        return resultsArray;
    }

    async _getQueryResultForQueryString(ctx, queryString) {
		let resultsIterator = await ctx.stub.getQueryResult(queryString);
		let resultsArray = await this._getAllResults(resultsIterator);

		return resultsArray;
	}

    async _getAllResults(iterator) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes;				
				try {					
                    jsonRes = JSON.parse(res.value.value.toString('utf8'));
                    allResults.push(jsonRes);
				} catch (err) {
					console.log(err);
					jsonRes = res.value.value.toString('utf8');
				}				
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

    async retrieveElectionResearchInProgress(ctx) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.start = true;
		queryString.selector.close = false;        

        const resultsArray = await this._getQueryResultForQueryString(ctx, JSON.stringify(queryString));

        return resultsArray;
    }
}

module.exports = AdminRepository;