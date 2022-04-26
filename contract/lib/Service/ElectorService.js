const process = require("dotenv").config();
const axios = require("axios");

const VOTE_LIMIT = Number(process.parsed.VOTE_LIMIT);
const API_ADDRESS_SEARCH_CPF = String(process.parsed.API_ADDRESS_SEARCH_CPF);
const API_TOKEN_SEARCH_CPF = String(process.parsed.API_TOKEN_SEARCH_CPF);

const Candidate = require("../Classes/Candidate");
const Elector = require("../Classes/Elector");
const BirthDate = require("../Classes/BirthDate");

const CpfDoesNotExist = require("../Exceptions/CpfDoesNotExist");
const TotalVotesAchieved = require("../Exceptions/TotalVotesAchieved");

const ElectorRepository = require("../Repository/ElectorRepository");

const TOTAL_OF_VOTES_ID = "TOTAL_OF_VOTES";

const CANDIDATE_NUMBER = {
	GOMES: "12",
	LULA: "13",
	BOLSONARO: "22",
	DORIA: "45",
	NULO: "1",
	NAO_SABE: "2"
}; 


class ElectorService {
	
	vote(ctx, cpf, year, month, day, candidateNumber) {
       
		//TODO: Não deixar abrir outra pesquisa eleitoral enquanto não tiver fechado a atual

		//TODO: Fazer parte de criar pesquisa
		const totalOfVotesBuffer = ctx.stub.getState(TOTAL_OF_VOTES_ID);
		const totalOfVotes = totalOfVotesBuffer.toString();
		if (totalOfVotes > VOTE_LIMIT) {
			throw new TotalVotesAchieved();
		}	

		//TODO: Buscar a pesquisa eleitoral aberta
		const candidate = Candidate.makeCandidate(candidateNumber);
		
		const birthDate = BirthDate.makeBirthDate(year, month, day);

		const elector = Elector.makeElector(cpf, candidate, birthDate);

		//TODO: Pesquisar se CPF existe
		const cpfExists = this._cpfExists(cpf);
		if (!cpfExists) {
			throw new CpfDoesNotExist();
		}

		//TODO: Verificar se já existe voto registrado

		const electorRepository = ElectorRepository();
		electorRepository.registerVote(ctx, elector, candidate);
	}

	async _cpfExists(cpfString, dateOfBirth) {        
		const request = {
			params: {
				token: API_TOKEN_SEARCH_CPF,
				cpf: cpfString,
				"data-nascimento": dateOfBirth,
				plugin: "CPF"
			}
		};

		const response = await axios.get(API_ADDRESS_SEARCH_CPF, request);
        
		//TODO: Verificar se response é válida        
		const result = {
			cpf: response.cpf,
			birthOfDate: response.data_nascimento
		};

		return result;
	}

}

module.exports = ElectorService;