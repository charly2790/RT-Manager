import _ from "lodash";
import { body } from "express-validator"
import { errorMessages } from "../utils/ErrorMessages.js"


export const validationRules = [
    body('idSesion')
        .notEmpty().withMessage(errorMessages.MISSING_FIELDS),
    body('rpe')
        .notEmpty().withMessage(errorMessages.MISSING_FIELDS),
    body().custom(( value, { req })=>{
        const { rol } = req;        
        if(_.isNil(rol)){
            throw new Error(errorMessages.ROLE_NOT_PROVIDED_ERROR);
        }
        return true;
    }),
    body().custom((value, { req }) => {
        const { link, comentario } = req.body;
        const { documentos } = req;
                
        if(_.isNil(link) && _.isNil(comentario) && (_.isNil(documentos) || documentos.length === 0)){            
            throw new Error(errorMessages.MISSING_FIELDS);
        }
        return true;
    }),
    body().custom((value, { req })=>{

        const { rol: { nombre : userRole = null} } = req;        

        if( userRole === 'EQUIPO_ADMIN'){            
            const { distancia, tiemporTotalSesion, tiempoNetoSesion } = req.body;            
            if( _.isNil(distancia) && _.isNil(tiemporTotalSesion) && _.isNil(tiempoNetoSesion)){
                throw new Error(errorMessages.MISSING_FIELDS);
            }
        }
        return true;
    })
]