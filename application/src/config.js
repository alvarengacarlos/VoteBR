const path = require("path");
const cookieSession = require("cookie-session");
const process = require("dotenv").config();

const config = (app, express) => {
    //Cokies
    app.use(cookieSession({
        name: "session",
        maxAge: 1 * 60 * 60 * 1000,
        secret: process.parsed.API_COOKIE_PRIVATE_KEY
    }));
    
    //Views dir
    app.set('views', path.join(__dirname, '/App/View'));    
    
    //Template engine
    app.set('view engine', 'pug');
    
    //Configure static files
    app.use(express.static(path.join(__dirname, '/App/Public')));    

    //Middleware for json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

module.exports = config;