class ExceptionFormatter {

    static returnsFormattedApiExceptions(exception) {
        return {
            message: exception.message,
            internalCode: exception.internalCode,
            httpStatusCode: exception.httpStatusCode
        };
    }

    static returnsFormattedContractExceptions(exception) {
        return {
            message: exception.message,
            internalCode: exception.internalCode,
            httpStatusCode: exception.httpStatusCode
        };
    }

}

module.exports = ExceptionFormatter;