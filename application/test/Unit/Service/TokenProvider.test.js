const { describe, beforeEach, it } = require("mocha");
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;


const TokenProvider = require("../../../src/App/Service/TokenProvider");
const TokenExpired = require("../../../src/App/Exception/TokenExpired");

describe("TokenProvider", () => {

    let tokenProvider;
    beforeEach(() => {
        tokenProvider = new TokenProvider();
    });
    
    describe("#generateToken", () => {

        it("Must generate a token", () => {
            const email = "admin@email.com";

            const token = tokenProvider.generateToken(email);

            expect(token).to.string;
        });

    });

    describe("#verifyToken", () => {

        it("Must verify a token", () => {
            const email = "admin@email.com";
            const token = tokenProvider.generateToken(email);
            
            expect(() => tokenProvider.verifyToken(token)).to.not.throw();
        });

        it("Must throw expired token", () => {
            const token = "aaaaaaa";
            
            expect(() => tokenProvider.verifyToken(token)).to.throw(TokenExpired);
        });

    });

});
