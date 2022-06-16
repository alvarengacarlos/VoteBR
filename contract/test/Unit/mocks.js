const { Context } = require("fabric-contract-api");
const { ChaincodeStub, ClientIdentity } = require("fabric-shim");
const sinon = require("sinon");

let ctx = new Context();
let chaincodeStub = sinon.createStubInstance(ChaincodeStub);

let clientIdentity = sinon.createStubInstance(ClientIdentity);
clientIdentity.assertAttributeValue
	.returns(true);

ctx.clientIdentity = clientIdentity;
ctx.stub = chaincodeStub;

chaincodeStub.putState.callsFake((key, value) => {
	if (!chaincodeStub.states) {
		chaincodeStub.states = {};
	}
	chaincodeStub.states[key] = value;
});

chaincodeStub.getState.callsFake(async (key) => {
	let ret;
	if (chaincodeStub.states) {
		ret = chaincodeStub.states[key];
	}
	return Promise.resolve(ret);
});

function resetChaincodeStubState() {
	chaincodeStub.states = null;
}

function makeIterator(array) {
	let nextIndex = 0;

	return {
		next: async () => {
			return nextIndex < array.length ?
				{value: array[nextIndex++], done: false} :
				{done: true};
		},
		close: () => {
			return {done: true};
		}
	};
}

module.exports = {ctx, chaincodeStub, resetChaincodeStubState, makeIterator};