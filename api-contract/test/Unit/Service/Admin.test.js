const { describe, beforeEach, it } = require("mocha");
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

const AdminService = require("../../../src/App/Service/Admin");

describe("AdminService", () => {

    let adminService = null;
    beforeEach(() => {
        adminService = new AdminService();
    });

    describe("#createElectionResearch", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                year: "2000",
                month: "01"
            };
    
            adminService.contractRepository.createElectionResearch = sinon.stub();
            adminService.contractRepository.createElectionResearch.returns();
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            expect(async () => {
                await adminService.createElectionResearch(payload);
            }).to.not.throw();
        });
        
    });

    describe("#insertCandidateInTheElectionResearch", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                candidateName: "Fulano de tal",
                candidateNumber: "01",
                photoUrl: "https://image.com"
            };
    
            adminService.contractRepository.insertCandidateInTheElectionResearch = sinon.stub();
            adminService.contractRepository.insertCandidateInTheElectionResearch.returns();
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            expect(async () => {
                await adminService.insertCandidateInTheElectionResearch(payload);
            }).to.not.throw();
        });
        
    });

    describe("#removeCandidateOfElectionResearch", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                candidateNumber: "01"
            };
    
            adminService.contractRepository.removeCandidateOfElectionResearch = sinon.stub();
            adminService.contractRepository.removeCandidateOfElectionResearch.returns();
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            expect(async () => {
                await adminService.removeCandidateOfElectionResearch(payload);
            }).to.not.throw();
        });
        
    });

    describe("#beginCollectingVotes", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            adminService.contractRepository.beginCollectingVotes = sinon.stub();
            adminService.contractRepository.beginCollectingVotes.returns();
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            expect(async () => {
                await adminService.beginCollectingVotes();
            }).to.not.throw();
        });
        
    });

    describe("#finishElectionResearch", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            adminService.contractRepository.finishElectionResearch = sinon.stub();
            adminService.contractRepository.finishElectionResearch.returns();
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            expect(async () => {
                await adminService.finishElectionResearch();
            }).to.not.throw();
        });
        
    });

    describe("#searchElectionResearch", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                year: "2000",
                month: "01"
            };
            
            adminService.contractRepository.searchElectionResearch = sinon.stub();
            adminService.contractRepository.searchElectionResearch.returns({});
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            const electionResearch = await adminService.searchElectionResearch(payload);

            expect(electionResearch).to.eql({});
        });
        
    });

    describe("#searchElectionResearchWithoutStarting", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                year: "2000",
                month: "01"
            };
            
            adminService.contractRepository.searchElectionResearchWithoutStarting = sinon.stub();
            adminService.contractRepository.searchElectionResearchWithoutStarting.returns({});
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            const electionResearchArray = await adminService.searchElectionResearchWithoutStarting(payload);

            expect(electionResearchArray).to.eql({});
        });
        
    });

    describe("#searchElectionResearchInProgress", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                year: "2000",
                month: "01"
            };
            
            adminService.contractRepository.searchElectionResearchInProgress = sinon.stub();
            adminService.contractRepository.searchElectionResearchInProgress.returns({});
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            const electionResearchArray = await adminService.searchElectionResearchInProgress(payload);

            expect(electionResearchArray).to.eql({});
        });
        
    });

    describe("#searchElectionResearchClosed", () => {
        
        it("Must be successfully, because the payload is correct", async () => {
            const payload = {
                year: "2000",
                month: "01"
            };
            
            adminService.contractRepository.searchElectionResearchClosed = sinon.stub();
            adminService.contractRepository.searchElectionResearchClosed.returns([{}]);
            
            adminService.connectionChaincode.connectElectorContract = sinon.stub();
            adminService.connectionChaincode.connectElectorContract.returns();
    
            const electionResearchArray = await adminService.searchElectionResearchClosed(payload);

            expect(electionResearchArray).to.eql([{}]);
        });
        
    });
});