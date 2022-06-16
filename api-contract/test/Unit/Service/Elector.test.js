const { describe, beforeEach, it } = require("mocha");
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

const ElectorService = require("../../../src/App/Service/Elector");
const InvalidCpf = require("../../../src/App/Exception/Elector/InvalidCpf");
const InvalidAge = require("../../../src/App/Exception/Elector/InvalidAge");

describe("ElectorService", () => {
    
    let electorService;

    beforeEach(() => {
        electorService = new ElectorService();           
    });

    describe("#getBirthDateObject", () => {

        it("It must return a birth date object", () => {
            const birthDateString = "2000-02-01";

            const birthDateObject = electorService.getBirthDateObject(birthDateString);

            expect(birthDateObject).to.eql({ year: "2000", month: "02", day: "01" });
        });

    });

    describe("#cpfIsValid", () => {

        it("It must return true", () => {
            const cpf = "01234567890";

            const result = electorService.cpfIsValid(cpf);

            expect(result).to.eql(true);
        });

        it("It must return false", () => {
            const cpf = "01234567891";

            const result = electorService.cpfIsValid(cpf);

            expect(result).to.eql(false);
        });

    });

    describe("#ageIsValid", () => {

        it("It must return true", () => {
            const birthDateString = "2000-02-01";
            const birthDateObject = electorService.getBirthDateObject(birthDateString);

            const result = electorService.ageIsValid(birthDateObject);

            expect(result).to.eql(true);
        });

        it("It must return false", () => {
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDay();
            const birthDateString = `${year}-${month}-${day}`;

            const birthDateObject = electorService.getBirthDateObject(birthDateString);

            const result = electorService.ageIsValid(birthDateObject);

            expect(result).to.eql(false);
        });

    });

    describe("#encryptCpf", () => {
        
        it("It must encrypt cpf", () => {
            const cpf = "01234567890";
            
            const result = electorService.encryptCpf(cpf);
            
            expect(result).to.eql("ee29eb4a8725678278ac439cf7abfd2a849cdc7378a6b6316017b81c51d720e7");
        });

    });

    describe("#vote", () => {

        it("It must throw invalid cpf", async () => {
            const payload = {
                cpf: "01234567891",
                birthDate: "2000-06-23"
            };
            
            await electorService.vote(payload).should.be.rejectedWith(InvalidCpf);
        });

        it("It must throw invalid age", async () => {
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDay();
            const birthDateString = `${year}-${month}-${day}`;

            const payload = {
                cpf: "01234567890",
                birthDate: birthDateString
            };
            
            await electorService.vote(payload).should.be.rejectedWith(InvalidAge);
        });

        it("It must be successfull, because the payload is correct", async () => {
            const payload = {
                cpf: "01234567890",
                birthDate: "2000-01-01",
                candidateNumber: "01"
            };            

            electorService.apiSearchCpf.validatesIfElectorIsReal = sinon.stub();
            electorService.apiSearchCpf.validatesIfElectorIsReal.returns();
            
            electorService.contractRepository.vote = sinon.stub();
            electorService.contractRepository.vote.returns();

            electorService.connectionChaincode.connectElectorContract = sinon.stub();
            electorService.connectionChaincode.connectElectorContract.returns();
                        
            const secretPhrase = await electorService.vote(payload);

            expect(secretPhrase).to.be.string
        });

    });

    describe("#searchElector", () => {

        it("It must throw invalid cpdf", async () => {
            const payload = {
                yearElection: "2000",
                monthElection: "02",
                cpf: "01234567891",                
                secretPhrase: "secret"
            };
            
            await electorService.searchElector(payload).should.be.rejectedWith(InvalidCpf);
        });

        it("It must be successfully, because the payload is correct", async () => {
            const payload = {
                yearElection: "2000",
                monthElection: "02",
                cpf: "01234567890",
                secretPhrase: "secret"                
            };

            electorService.contractRepository.searchElector = sinon.stub();
            electorService.contractRepository.searchElector.returns({});

            electorService.connectionChaincode.connectElectorContract = sinon.stub();
            electorService.connectionChaincode.connectElectorContract.returns();
                        
            const elector = await electorService.searchElector(payload);
            
            expect(elector).to.eql({});
        });

    });

    describe("#searchElectionResearchInProgress", () => {

        it("It must sucessfully, because the information is correct", async () => {
            electorService.contractRepository.searchElectionResearchInProgress = sinon.stub();
            electorService.contractRepository.searchElectionResearchInProgress.returns({});

            electorService.connectionChaincode.connectElectorContract = sinon.stub();
            electorService.connectionChaincode.connectElectorContract.returns();
                        
            const electionResearch = await electorService.searchElectionResearchInProgress();

            expect(electionResearch).to.eql({});
        });        

    });

    describe("#searchElectionResearchClosed", () => {

        it("It must sucessfully, because the information is correct", async () => {
            electorService.contractRepository.searchElectionResearchClosed = sinon.stub();
            electorService.contractRepository.searchElectionResearchClosed.returns({});

            electorService.connectionChaincode.connectElectorContract = sinon.stub();
            electorService.connectionChaincode.connectElectorContract.returns();
                        
            const electionResearch = await electorService.searchElectionResearchClosed();

            expect(electionResearch).to.eql({});
        });        

    });

});