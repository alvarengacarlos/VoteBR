const process = require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");

const TokenExpired = require("../Exception/TokenExpired");

class TokenProvider {
    
    constructor() {
        this.privateKey = String(process.parsed.API_JWT_TOKEN_PRIVATE_KEY);
        this.tokenLib = jsonWebToken;        
    }

    configurateToken(email) {
        return {
            algorithm: "HS256",
            expiresIn: "1h",
            subject: email,
        };
    }

    generateToken(email) {
        const payload = {
            email: email,
            admin: true
        };

        const options = this.configurateToken(email);

        const token = this.tokenLib.sign(payload, this.privateKey, options);

        return token;
    }

    verifyToken(token) {
        try {
            const decoded = this.tokenLib.verify(token, this.privateKey);
            return decoded;

        } catch (error) {          
            throw new TokenExpired();
        }
    }
}

module.exports = TokenProvider;