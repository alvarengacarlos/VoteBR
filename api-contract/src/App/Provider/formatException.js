const Exception = require("../Exception/Exception");

module.exports = function formatException(exception) {
    
    if (exception instanceof Exception) {
        return {                
            message: exception.message,
            internalCode: exception.internalCode,
            httpStatusCode: exception.httpStatusCode
        };
    }
    
    return {
        message: exception.message,
        internalCode: "SERVER_ERROR",
        httpStatusCode: 500
    };
}