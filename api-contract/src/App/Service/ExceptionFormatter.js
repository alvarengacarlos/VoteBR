const Exception = require("../Exception/Exception");

class ExceptionFormatter {

    static formatApiException(exception) {
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

    static formatJoiException(error) {
        return {
            message: error.message,
            internalCode: "CLIENT_ERROR",
            httpStatusCode: 400
        };
    }

}

module.exports = ExceptionFormatter;