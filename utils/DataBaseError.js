import { BaseError } from "./BaseError.js";

export class DataBaseError extends BaseError {
    constructor(message){
        super(message, 500, 'DATABASE_ERROR');
    }
}