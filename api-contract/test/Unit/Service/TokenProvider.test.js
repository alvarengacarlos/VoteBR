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
    
    describe("#generateTokenAdmin", () => {

        it("Must generate a token", () => {
            const email = "admin@email.com";

            const token = tokenProvider.generateTokenAdmin(email);

            expect(token).to.string;
        });

    });

    describe("#verifyTokenAdmin", () => {

        it("Must verify a token", () => {
            const email = "admin@email.com";
            const token = tokenProvider.generateTokenAdmin(email);
            
            expect(() => tokenProvider.verifyTokenAdmin(token)).to.not.throw();
        });

        it("Must throw expired token", () => {
            const token = "aaaaaaa";
            
            expect(() => tokenProvider.verifyTokenAdmin(token)).to.throw(TokenExpired);
        });

    });

    describe("#verifyTokenElector", () => {

        it("Must verify a token", () => {
            const token = tokenProvider.generateTokenElector();
            
            expect(() => tokenProvider.verifyTokenElector(token)).to.not.throw();
        });

        it("Must throw expired token", () => {
            const token = "aaaaaaa";
            
            expect(() => tokenProvider.verifyTokenElector(token)).to.throw(TokenExpired);
        });

    });

});
