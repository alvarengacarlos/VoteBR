const process = require("dotenv").config();
const axios = require("axios");

const ExternalApiException = require("../Exception/ApiSearchCpf/ExternalApiException");
const InternalApiException = require("../Exception/ApiSearchCpf/InternalApiException");
const InternalFailureWhenSearchingVoter = require("../Exception/InternalFailureWhenSearchingVoter");

const API_SEARCH_CPF_TOKEN = String(process.parsed.API_SEARCH_CPF_TOKEN);
const API_SEARCH_CPF_PLUGIN = String(process.parsed.API_SEARCH_CPF_PLUGIN);
const API_SEARCH_CPF_URL = String(process.parsed.API_SEARCH_CPF_URL);

class ApiSearchCpf {
    constructor() {
		this.requestLib = axios;
		this.API_SEARCH_CPF_TOKEN = API_SEARCH_CPF_TOKEN;
		this.API_SEARCH_CPF_PLUGIN = API_SEARCH_CPF_PLUGIN;
		this.API_SEARCH_CPF_URL = API_SEARCH_CPF_URL;
		this.codeApiResponses = [
			{code: 0, message: "Pesquisa realizada com sucesso"},
			{code: 1, message: "Nenhum CPF encontrado na Receita Federal"},
			{code: 2, message: "CPF inválido"},
			{code: 3, message: "Token inválido"},
			{code: 4, message: "Usuário não contratou nenhum pacote de créditos"},
			{code: 5, message: "Os créditos contratados acabaram"},
			{code: 6, message: "Plugin não existe"},
			{code: 7, message: "Site da Receita Federal CPF está com instabilidade"},
			{code: 8, message: "Ocorreu um erro interno, por favor contatar o nosso suporte"},
			{code: 9, message: "Data de nascimento informada está divergente da base de dados da Receita Federal do Brasil"}
		];		   
	}

    async validatesIfElectorIsReal(cpf, birthDateObject) {
        const response = await this.searchElector(cpf, birthDateObject);
        
        this.analyzeResponse(response);
    }

    async searchElector(cpf, birthDateObject) {
        const request = {
			params: {
				token: this.API_SEARCH_CPF_TOKEN,
				cpf: cpf,
				"data-nascimento": `${birthDateObject.day}${birthDateObject.month}${birthDateObject.year}`,
				plugin: this.API_SEARCH_CPF_PLUGIN
			}
		};

		let response;
        try {
            response = await this.requestLib.get(this.API_SEARCH_CPF_URL, request);
            return response;
            
        } catch(error) {
            console.error(error);
            throw new InternalFailureWhenSearchingVoter();
        }
    }

    analyzeResponse(response) {
		const HTTP_CODE_OK = 200;
		
		if (response.status == HTTP_CODE_OK && response.data.code == this.codeApiResponses[0].code) {
			return;
		}
		
		const externalCodeArray = [1, 2, 9];
		for (let code of externalCodeArray) {				
			if (response.data.code == code) {
				throw new ExternalApiException(response.data.message);
			}
		}		

		const internalCodeArray = [3, 4, 5, 6, 7, 8];
		for (let code of internalCodeArray) {
			if (response.data.code == code) {
				const ex = new InternalApiException(response.data.message);
				console.error(ex.message);
			}
		}

        throw new InternalFailureWhenSearchingVoter();
		
	}

}

module.exports = ApiSearchCpf;