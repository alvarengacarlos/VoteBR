const validatePlugin = (req, res, next) => {

	const plugin = req.query.plugin;

	if (plugin !== "CPF") {
		return res.status(400).json({error: "Invalid plugin"});
	}

	next();

};

module.exports = validatePlugin;