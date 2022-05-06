const Exception = require("./Exception");

class SystemConfigurationException extends Exception {
    constructor(location) {
		super("SYSTEM_CONFIGURATION_EXCEPTION", 500, `Incorrect configuration: ${location}`);
	}  
}

module.exports = SystemConfigurationException;