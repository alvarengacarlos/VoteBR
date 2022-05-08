const { describe, beforeEach, it } = require("mocha");
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const Auth = require("../../../src/App/Service/Auth");
const AuthFail = require("../../../src/App/Exception/AuthFail");

describe("Auth", () => {

    let auth;
    beforeEach(() => {
        auth = new Auth();
    });
    
    describe("#authenticateAdmin", () => {

        it("Must return a token", () => {
            auth.email = "admin@email.com";
            auth.password = "adminpw";
            
            const payload = {
                email: "admin@email.com",
                password: "adminpw"
            };

            const token = auth.authenticateAdmin(payload);

            expect(token).to.be.string;
        });

        it("Must throw auth fail exception", () => {
            const payload = {
                email: "admin@email.com",
                password: "123"
            };
            
            expect(() => auth.authenticateAdmin(payload)).to.throw(AuthFail);            
        });

    });

});