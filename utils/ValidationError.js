import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
    constructor(message){
        super(message, 400, 'VALIDATION_ERROR');
    }
}