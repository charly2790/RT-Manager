import { DataBaseError } from "./DataBaseError.js";
import { errorTypes } from "./ErrorTypes.js";
import { ValidationError } from "./ValidationError.js";

export class ErrorFactory {

    static createError(type, message){
        switch(type){
            case errorTypes.VALIDATION_ERROR:
                return new ValidationError(message);
            case errorTypes.DATABASE_ERROR:
                return new DataBaseError(message);
        }
    }
}