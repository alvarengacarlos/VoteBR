const process = require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const crypto = require("crypto");

const Forbidden = require("../Exception/Forbidden");


const TokenExpired = require("../Exception/TokenExpired");

class TokenProvider {
    
    constructor() {
        this.privateKey = String(process.parsed.API_JWT_TOKEN_PRIVATE_KEY);
        this.tokenLib = jsonWebToken;        
    }

    configurateTokenAdmin(email) {
        return {
            algorithm: "HS256",
            expiresIn: "1h",
            subject: email,
        };
    }

    generateTokenAdmin(email) {
        const payload = {
            email: email,
            admin: true
        };

        const options = this.configurateTokenAdmin(email);

        const token = this.tokenLib.sign(payload, this.privateKey, options);

        return token;
    }

    configurateTokenElector() {
        return {
            algorithm: "HS256",
            expiresIn: "1h",
            subject: crypto.randomUUID(),
        };
    }

    generateTokenElector() {
        const payload = {            
            elector: true
        };

        const options = this.configurateTokenElector();

        const token = this.tokenLib.sign(payload, this.privateKey, options);

        return token;
    }

    verifyTokenAdmin(token) {
        try {
            const decoded = this.tokenLib.verify(token, this.privateKey);
            
            if (decoded.admin != true) {
                throw new Forbidden();
            }
            
            return decoded;

        } catch (error) {          
            throw new TokenExpired();
        }
    }

    verifyTokenElector(token) {
        try {
            const decoded = this.tokenLib.verify(token, this.privateKey);
            
            if (decoded.elector != true) {
                throw new Forbidden();
            }
            
            return decoded;

        } catch (error) {          
            throw new TokenExpired();
        }
    }
}

module.exports = TokenProvider;