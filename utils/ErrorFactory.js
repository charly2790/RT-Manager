import { DataBaseError } from "./DataBaseError.js";
import { errorTypes } from "./ErrorTypes.js";
import { NoDataFoundError, ValidationError } from "./ValidationError.js";

export class ErrorFactory {

    static createError(type, message){
        switch(type){
            case errorTypes.VALIDATION_ERROR:
                return new ValidationError(message);
            case errorTypes.DATABASE_ERROR:
                return new DataBaseError(message);
            case errorTypes.NO_DATA_ERROR:
                return new NoDataFoundError(message);
        }
    }
}