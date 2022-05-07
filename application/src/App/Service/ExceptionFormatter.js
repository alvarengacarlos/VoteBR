class ExceptionFormatter {

    returnsFormattedApiExceptions(exception) {
        return {
            message: exception.message,
            internalCode: exception.internalCode,
            httpStatusCode: exception.httpStatusCode
        };
    }

    returnsFormattedContractExceptions(exception) {
        return {
            message: exception.message,
            internalCode: exception.internalCode,
            httpStatusCode: exception.httpStatusCode
        };
    }

}

module.exports = ExceptionFormatter;