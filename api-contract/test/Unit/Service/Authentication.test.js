const { describe, beforeEach, it } = require("mocha");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const Authentication = require("../../../src/App/Service/Authentication");
const AuthenticateFail = require("../../../src/App/Exception/AuthenticateFail");

describe("Auth", () => {

    let auth;
    beforeEach(() => {
        auth = new Authentication();
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
            
            expect(() => auth.authenticateAdmin(payload)).to.throw(AuthenticateFail);            
        });

    });

    describe("#authenticateElector", () => {

        it("Must return a token", () => {
            auth.email = "elector@email.com";
            auth.password = "electorpw";
            
            const payload = {
                email: "elector@email.com",
                password: "electorpw"
            };

            const token = auth.authenticateElector(payload);

            expect(token).to.be.string;
        });

        it("Must throw auth fail exception", () => {
            const payload = {
                email: "elector@email.com",
                password: "123"
            };
            
            expect(() => auth.authenticateAdmin(payload)).to.throw(AuthenticateFail);            
        });

    });
});