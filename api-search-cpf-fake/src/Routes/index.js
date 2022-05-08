const routesApp = require("./routesApp");

const routes = (app) => {

	app.use((req, res, next) => {
		routesApp(app);        
        
		next();
	});

};

module.exports = routes;