const ApiService = require("../Service/Api");

class Api {

	searchCpf(req, res) {
		try {
			const apiService = new ApiService();
			const resultJson = apiService.searchCpf(req.query);
            
			return res.status(200).json(resultJson);

		} catch(error) {            
			return res.status(400).json({error: error.message});
		}
	}

}

module.exports = new Api();