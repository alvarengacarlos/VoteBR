const process = require("dotenv").config();

const TokenProvider = require("./TokenProvider");

const AuthFail = require("../Exception/AuthFail");

class Auth {

    constructor() {
        this.email = process.parsed.API_ADMIN_USERNAME;
        this.password = process.parsed.API_ADMIN_PASSWORD;
    }

    authenticateAdmin(payload) {
        const email = String(payload.email);
        const password = String(payload.password);

        if (this.email == email && this.password == password) {
            const token = new TokenProvider().generateToken(email);
            return token;
        }

        throw new AuthFail();
    }

}

module.exports = Auth;