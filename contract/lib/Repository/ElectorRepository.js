const ExistingRecord = require("../Exceptions/ExistingRecord");
const NotExistsRecord = require("../Exceptions/NotExistingRecord");

class ElectorRepository {
    
	async registerElector(ctx, elector) {
		const electorExists = await this.electorExists(ctx, elector.getId());
        if (electorExists) {
            throw new ExistingRecord();
        }

        await ctx.stub.putState(elector.getId(), elector.serializerInBuffer());
	}

	async electorExists(ctx, elector) {
        const buffer = await ctx.stub.getState(elector);
        return !!buffer && buffer.length > 0;
    }

	async retrieveElector(ctx, elector) {
		const electorExists = await this.electorExists(ctx, elector.getId());
        if (!electorExists) {
            throw new NotExistsRecord();
        }

        const e = await ctx.stub.getState(elector.getId());
		return e;
	}

}

module.exports = ElectorRepository;