class Err extends Error {
    constructor(args, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Err);
        }
        Object.assign(this, args);
    }
}

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = { ErrorHandler, handleError };
