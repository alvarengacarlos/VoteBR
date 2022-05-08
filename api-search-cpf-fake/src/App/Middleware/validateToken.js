const process = require("dotenv").config();
const API_TOKEN = process.parsed.API_TOKEN;

const validateToken = (req, res, next) => {

	const token = req.query.token;

	if (token !== API_TOKEN) {
		return res.status(401).json({error: "Invalid token"});
	}

	next();

};

module.exports = validateToken;