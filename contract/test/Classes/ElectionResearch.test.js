const chai = require("chai");
const expect = chai.expect;
const {describe, it} = require("mocha");

const ElectionResearch = require("../../lib/Classes/ElectionResearch");

describe("ElectionResearch", () => {

    describe("#makeElectionResearch", () => {

        it("Must return an instance of ElectionResearch", () => {
            const electionResearch = ElectionResearch.makeElectionResearch("2000", "01");

            expect(electionResearch).to.instanceOf(ElectionResearch);
        });

    });

    describe("#mountsObjectRetrievedFromTheBlockchain", () => {

        it("Must return an ElectionResearch object", () => {
            const object = {
                id: "2000-01",
                candidatesList: [],
                start: false,
                close: false,
                createIn: new Date().toString(),
                finishIn: null
            };

            const electionResearch = ElectionResearch.mountsObjectRetrievedFromTheBlockchain(object);

            expect(electionResearch).to.instanceOf(ElectionResearch);
        });

    });

});