class Api {

	searchCpf(payload) {
		const cpf = String(payload.cpf);
		const birthDate = String(payload["data-nascimento"]);

		const day = birthDate[0] + birthDate[1];
		const month = birthDate[2] + birthDate[3];
		const year = birthDate[4] + birthDate[5] + birthDate[6] + birthDate[7];

		const birthDateFormatted = `${day}/${month}/${year}`;

		return {
			status: "OK",
			code: 0,
			message: "Pesquisa realizada com sucesso.",
			cpf: cpf,
			nome: "Fulano",
			data_nascimento: birthDateFormatted,
			situacao_cadastral: "Regular",
			genero: "M",
			data_inscricao: birthDateFormatted,
			digito_verificador: `${cpf[9]}${cpf[10]}`,
			comprovante: "True"
		};
	}

}

module.exports = Api;