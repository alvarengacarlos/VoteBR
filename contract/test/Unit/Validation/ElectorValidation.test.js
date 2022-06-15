const chai = require("chai");
const expect = chai.expect;
const {describe, beforeEach, it} = require("mocha");

const ElectorValidation = require("../../../lib/Validation/ElectorValidation");
const IncorrectInformationReceived = require("../../../lib/Exceptions/IncorrectInformationReceived");

describe("ElectorValidation", () => {
    
	let electorValidation;
	
	beforeEach(() => {
		electorValidation = new ElectorValidation();		
	});

	describe("#validateVote", () => {
		let cpf = "adfsdfs00000fsdfdf000000";
		let candidateNumber = "01";
		let secretPhrase = "secretPhrase";
        
		it("Must be successful, because values is correct", () => {
			const value = electorValidation.validateVote(cpf, candidateNumber, secretPhrase);
            
			expect({cpfHashing: cpf, candidateNumber, secretPhrase}).to.eql(value);     
		});

		it("Must throw error, because the value is incorrect", () => {
			expect(
				() => electorValidation.validateVote("#0##000000000", candidateNumber, secretPhrase)
			).to.throw(IncorrectInformationReceived);     
          
			expect(
				() => electorValidation.validateVote(cpf, "1", secretPhrase)
			).to.throw(IncorrectInformationReceived);
            
			expect(
				() => electorValidation.validateVote(cpf, "100", secretPhrase)
			).to.throw(IncorrectInformationReceived); 

			expect(
				() => electorValidation.validateVote(cpf, candidateNumber, 1)
			).to.throw(IncorrectInformationReceived);
		});

	});

	describe("#validateSearchElector", () => { 
		
		let cpfHashing = "adfsdfs00000fsdfdf000000";
		let yearElectionResearch = "2000";
		let monthElectionResearch = "01";
		let secretPhrase = "secretPhrase";
		
		it("Must be successful, because values is correct", () => {
			const value = electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, cpfHashing, secretPhrase);
			
			expect({cpfHashing, yearElectionResearch, monthElectionResearch, secretPhrase}).to.eql(value);
		});
        
		it("Must throw error, because the value is incorrect", () => {            
			expect(
				() => electorValidation.validateSearchElector(yearElectionResearch, monthElectionResearch, "0$$###000000000", secretPhrase)
			).to.throw(IncorrectInformationReceived);     
	
			expect(
				() => electorValidation.validateSearchElector("200", monthElectionResearch, cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => electorValidation.validateSearchElector("20000", monthElectionResearch, cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => electorValidation.validateSearchElector(yearElectionResearch, "1", cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);
		
			expect(
				() => electorValidation.validateSearchElector(yearElectionResearch, "011", cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);

			expect(
				() => electorValidation.validateSearchElector(yearElectionResearch, "00", cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);

			expect(
				() => electorValidation.validateSearchElector(yearElectionResearch, "13", cpfHashing, secretPhrase)
			).to.throw(IncorrectInformationReceived);
		});

	});
});