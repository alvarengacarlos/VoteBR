const ElectionResearch = require("../Classes/ElectionResearch");
const AdminRepository = require("../Repository/AdminRepository");

class AdminService {
    
    async createElectionResearch(ctx, year, month) {        
        
        const electionResearch = ElectionResearch.makeElectionResearch(year, month);

        const adminRepository = new AdminRepository();
        await adminRepository.createElectionResearch(ctx, electionResearch);
    }

}

module.exports = AdminService;