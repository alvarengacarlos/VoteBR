const { describe, beforeEach, it } = require("mocha");
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

const ApiSearchCpf = require("../../../src/App/Service/ApiSearchCpf");
const InternalFailureWhenSearchingVoter = require("../../../src/App/Exception/InternalFailureWhenSearchingVoter")
const ExternalApiException = require("../../../src/App/Exception/ApiSearchCpf/ExternalApiException");

describe("ApiSearchCpf", () => {

    let apiSearchCpf;
    
    beforeEach(() => {        
        apiSearchCpf = new ApiSearchCpf();
        apiSearchCpf.API_SEARCH_CPF_TOKEN = "token";
        apiSearchCpf.API_SEARCH_CPF_PLUGIN = "01234567890";
        apiSearchCpf.API_SEARCH_CPF_URL = "/api/v1/execute-api.php";
    
        class RequestLibFake {
            get() {}
        }

        apiSearchCpf.requestLib = sinon.createStubInstance(RequestLibFake);       
    });

    describe("#searchElector", () => {

        it("It must throw InternalFailureWhenSearchingVoter", async () => {
            apiSearchCpf.requestLib.get.callsFake(() => {
                throw new Error();
            });

            const cpf = "01234567890";
            const birthDateObject = {
                year: "2000",
                month: "05",
                day: "01"
            };

            await apiSearchCpf.searchElector(cpf, birthDateObject)
                .should.be.rejectedWith(InternalFailureWhenSearchingVoter);
        });

        it("It must be successfull", async () => {
            apiSearchCpf.requestLib.get.callsFake(async () => {
                const response = {
                    status: 200,
                    data: {code: 0}
                };

                return response;
            });               
          
            const cpf = "01234567890";
            const birthDateObject = {
                year: "2000",
                month: "05",
                day: "01"
            };

            const result = await apiSearchCpf.searchElector(cpf, birthDateObject);
            
            expect(result.status).to.eql(200);
        });

    });

    describe("#analyzeResponse", () => {

        it("It must throw ExternalApiException", () => {
            const response = {
                status: 400,
                data: {code: null, message: "Error"}
            };

            const codes = [1, 2, 9];
            for (c of codes) {                
                response.data.code = c;
                
                expect(
                    () => apiSearchCpf.analyzeResponse(response)
                ).to.throw(ExternalApiException);
            }
            
        });

        it("It must logger InternalApiException and throw InternalFailureWhenSearchingVoter", () => {
            const response = {
                status: 400,
                data: {code: null, message: "Error"}
            };

            const codes = [3, 4, 5, 6, 7, 8];
            for (c of codes) {                
                response.data.code = c;                
                expect(
                    () => apiSearchCpf.analyzeResponse(response)
                ).to.throw(InternalFailureWhenSearchingVoter);
            }
            
        });

        it("It must be successfull", async () => {            
            const response = {
                status: 200,
                data: {code: 0}
            };

            const result = apiSearchCpf.analyzeResponse(response);

            expect(result).to.be.undefined
        });

    });

});