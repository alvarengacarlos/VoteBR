const {Buffer} = require("buffer");

class Serializer {

	serializerInBuffer() {
		return Buffer.from(JSON.stringify(this));
	}

}

module.exports = Serializer;