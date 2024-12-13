export class BaseError extends Error {

    constructor(message, statusCode, name = 'Error'){
        super(message);
        this.statusCode = statusCode || 500;
        this.name = name;
        Error.captureStackTrace(this, this.constructor);                 
    }
}