const path = require("path");

const config = (app, express) => {
    //Views dir
    app.set('views', path.join(__dirname, '/App/View'));    
    
    //Template engine
    app.set('view engine', 'pug');
    
    //Configure static files
    app.use(express.static(path.join(__dirname, '/App/Public')));    

    //Middleware for json
    app.use(express.json());
};

module.exports = config;