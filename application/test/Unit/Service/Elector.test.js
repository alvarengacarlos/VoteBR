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
    
    let electorService, requestLibFake;

    beforeEach(() => {
        electorService = new ElectorService();
        
        class RequestLibFake {
            get(){};
        }
        requestLibFake = sinon.createStubInstance(RequestLibFake);
        electorService.requestLib = requestLibFake;
    });

    describe("#getBirthDateObject", () => {

        it("Must return a birth date object", () => {
            const birthDateString = "2000-02-01";

            const birthDateObject = electorService.getBirthDateObject(birthDateString);

            expect(birthDateObject).to.eql({ year: "2000", month: "02", day: "01" });
        });

    });

    describe("#cpfIsValid", () => {

        it("Must return true", () => {
            const cpf = "01234567890";

            const result = electorService.cpfIsValid(cpf);

            expect(result).to.eql(true);
        });

        it("Must return false", () => {
            const cpf = "01234567891";

            const result = electorService.cpfIsValid(cpf);

            expect(result).to.eql(false);
        });

    });

    describe("#ageIsValid", () => {

        it("Must return true", () => {
            const birthDateString = "2000-02-01";
            const birthDateObject = electorService.getBirthDateObject(birthDateString);

            const result = electorService.ageIsValid(birthDateObject);

            expect(result).to.eql(true);
        });

        it("Must return false", () => {
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
        
        it("Must encrypt cpf", () => {
            const cpf = "01234567890";
            
            const result = electorService.encryptCpf(cpf);
            
            console.log(result);
            expect(result).to.eql("ee29eb4a8725678278ac439cf7abfd2a849cdc7378a6b6316017b81c51d720e7");
        });

    });

    describe("#voteInBlockchain", () => {

        it("Must throw invalid cpf", async () => {
            const payload = {
                cpf: "01234567891",
                birthDate: "2000-06-23"
            };
            
            await electorService.voteInBlockchain(payload).should.be.rejectedWith(InvalidCpf);
        });

        it("Must throw invalid age", async () => {
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDay();
            const birthDateString = `${year}-${month}-${day}`;

            const payload = {
                cpf: "01234567890",
                birthDate: birthDateString
            };
            
            await electorService.voteInBlockchain(payload).should.be.rejectedWith(InvalidAge);
        });

        it("Must be successfull", async () => {
            electorService.requestLib.get.callsFake(async () => {
                const response = {
                    status: 200,
                    data: {code: 0}
                };

                return response;
            });         
            
            const payload = {
                cpf: "01234567890",
                birthDate: "2000-06-23",
                numberOfCandidate: "01"
            };
            
            
            const result = await electorService.voteInBlockchain(payload);
            
            expect(result).to.eql({
                cpf: payload.cpf, 
                numberOfCandidate: payload.numberOfCandidate
            });
        });

    });

    describe("#searchElectorInBlockchain", () => {

        it("Must throw invalid cpdf", async () => {
            const payload = {
                cpf: "01234567891",
                yearElection: "2000",
                monthElection: "02"
            };
            
            await electorService.searchElectorInBlockchain(payload).should.be.rejectedWith(InvalidCpf);
        });

        it("Must be successfully", async () => {
            const payload = {
                cpf: "01234567890",
                yearElection: "2000",
                monthElection: "02"
            };
            
            const result = await electorService.searchElectorInBlockchain(payload);

            expect(result).to.eql(payload.cpf);
        });

    });

    describe("#searchElectionResearchLikeElector", () => {
        
        it("Must be successfully", async () => {
            const payload = {                
                yearElection: "2000",
                monthElection: "02"
            };
            
            const result = await electorService.searchElectionResearchLikeElectorInBlockchain(payload);

            expect(result).to.eql({
                "yearElection": payload.yearElection, 
                "monthElection": payload.monthElection
            });
        });

    });

});