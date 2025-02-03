import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
    constructor(message){
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class NoDataFoundError extends BaseError {
    constructor(message){
        super(message, 404, 'NO_DATA_FOUND_ERROR');
    }
}