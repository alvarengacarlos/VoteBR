const crypto = require("crypto");
const process = require("dotenv").config();
const CONTRACT_ELECTOR_IDENTITY_USERNAME = process.parsed.CONTRACT_ELECTOR_IDENTITY_USERNAME;
const {buildWallet} = require("../../Infra/Chaincode/AppUtil");
const ConnectionChaincode = require("../../Infra/Chaincode/ConnectionChaincode");

const InvalidCpf = require("../Exception/Elector/InvalidCpf");
const InvalidAge = require("../Exception/Elector/InvalidAge");
const ApiSearchCpf = require("./ApiSearchCpf");

const ElectorContractRepository = require("../Repository/ElectorContractRepository");

class Elector {

	constructor() {		
		this.contractRepository = new ElectorContractRepository();
		this.apiSearchCpf = new ApiSearchCpf();
		this.connectionChaincode = new ConnectionChaincode();
	}

	async vote(payload) {		
        const cpf = String(payload.cpf);		
        const birthDate = String(payload.birthDate);
        const candidateNumber = String(payload.candidateNumber);

		const birthDateObject = this.getBirthDateObject(birthDate);
		
		const ageIsValid = this.ageIsValid(birthDateObject);
        if (!ageIsValid) {
            throw new InvalidAge();
        }

        const cpfIsValid = this.cpfIsValid(cpf);
        if (!cpfIsValid) {
            throw new InvalidCpf();
        }        
		
		await this.apiSearchCpf.validatesIfElectorIsReal(cpf, birthDateObject);        
		
		const cpfHashing = this.encryptCpf(cpf);
		const secretPhrase = crypto.randomUUID({disableEntropyCache: false});
		
		//Smart Contract call
		const wallet = await buildWallet();
        
        const chaincode = await this.connectionChaincode.connectElectorContract(wallet, CONTRACT_ELECTOR_IDENTITY_USERNAME);

        await this.contractRepository.vote(chaincode, cpfHashing, candidateNumber, secretPhrase);
		
		return secretPhrase;
    }

	getBirthDateObject(birthDate) {
		const dateArray = birthDate.split("-");
		
		const birthDateObject = {
			year: dateArray[0],
			month: dateArray[1],
			day: dateArray[2] 
		};		

		return birthDateObject;
	}

    cpfIsValid(cpf) {
		var sum;
		var mod;
		sum = 0;

		if (cpf == "00000000000") {
			return false;
		}

		for (let i = 1; i <= 9; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}

		mod = (sum * 10) % 11;
		if ((mod == 10) || (mod == 11)) {
			mod = 0;
		}

		if (mod != parseInt(cpf.substring(9, 10))) {
			return false;
		}

		sum = 0;
		for (let i = 1; i <= 10; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}

		mod = (sum * 10) % 11;
		if ((mod == 10) || (mod == 11)) {
			mod = 0;
		}

		if (mod != parseInt(cpf.substring(10, 11))) {
			return false;
		}

		return true;
	}

    ageIsValid(birthDateObject) {
        const MINIMUM_AGE = 16;

		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const day = new Date().getDate();
		
		const toDay = new Date(`${year}-${month}-${day}`);
		const birthDate = new Date(`${birthDateObject.year}-${birthDateObject.month}-${birthDateObject.day}`);

		const age =  (toDay.getFullYear() - birthDate.getFullYear());		

        if (age >= MINIMUM_AGE) {
            return true
        }

        return false;
	}	

	encryptCpf(cpf) {
		const hash = crypto.createHash("sha256");
		const cpfHashing  = hash.update(cpf, "utf-8");
		
		return cpfHashing.digest("hex")
	}

	async searchElector(payload) {
		const yearElection = String(payload.yearElection);
		const monthElection = String(payload.monthElection);
		const cpf = String(payload.cpf);
		const secretPhrase = String(payload.secretPhrase);

		const cpfIsValid = this.cpfIsValid(cpf);
		if (!cpfIsValid) {
            throw new InvalidCpf();
        }

		const cpfHashing = this.encryptCpf(cpf);

		//Smart contract call
		const wallet = await buildWallet();

        const chaincode = await this.connectionChaincode.connectElectorContract(wallet, CONTRACT_ELECTOR_IDENTITY_USERNAME);

		return (await this.contractRepository.searchElector(chaincode, yearElection, monthElection, cpfHashing, secretPhrase));
	}

	async searchElectionResearchInProgress() {	
		const wallet = await buildWallet();

        const chaincode = await this.connectionChaincode.connectElectorContract(wallet, CONTRACT_ELECTOR_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearchInProgress(chaincode));
	}

	async searchElectionResearchClosed() {
		const wallet = await buildWallet();

        const chaincode = await this.connectionChaincode.connectElectorContract(wallet, CONTRACT_ELECTOR_IDENTITY_USERNAME);

        return (await this.contractRepository.searchElectionResearchClosed(chaincode));
	}
}

module.exports = Elector;