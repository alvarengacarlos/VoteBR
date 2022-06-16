const process = require("dotenv").config();

const TokenProvider = require("../Provider/TokenProvider");

const AuthenticateFail = require("../Exception/AuthenticateFail");

class Authenticate {

    constructor() {
        this.adminEmail = process.parsed.API_ADMIN_EMAIL;
        this.adminPassword = process.parsed.API_ADMIN_PASSWORD;
        
        this.electorEmail = process.parsed.API_ELECTOR_EMAIL;
        this.electorPassword = process.parsed.API_ELECTOR_PASSWORD;
    }

    authenticateAdmin(payload) {
        const email = String(payload.email);
        const password = String(payload.password);

        if (this.adminEmail == email && this.adminPassword == password) {
            const token = new TokenProvider().generateTokenAdmin(email);
            return token;
        }

        throw new AuthenticateFail();
    }

    authenticateElector(payload) {
        const email = String(payload.email);
        const password = String(payload.password);

        if (this.electorEmail == email && this.electorPassword == password) {
            const token = new TokenProvider().generateTokenElector(email);
            return token;
        }

        throw new AuthenticateFail();
    }

}

module.exports = Authenticate;