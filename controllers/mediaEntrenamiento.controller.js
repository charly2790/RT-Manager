import _ from "lodash"
import { ErrorFactory } from "../utils/ErrorFactory.js";
import { errorMessages } from "../utils/ErrorMessages.js";
import { errorTypes } from "../utils/ErrorTypes.js";
import Documento from "../models/Documento.js";
import MediaEntrenamiento from "../models/MediaEntrenamiento.js";

export const create = async (req, res, next) => {
    
    try {
        if (_.isNil(req.documentos) || req.documentos.length === 0) {            
            return next();
        }        

        if (_.isNil(req.entrenamiento)) {
            return next();
        }                

        const { documentos, entrenamiento: { idEntrenamiento } } = req;        

        const newMediaRecords = documentos.map(documento => ({ idEntrenamiento, idDocumento: documento.idDocumento }));                

        const mediaCreated = await MediaEntrenamiento.bulkCreate(newMediaRecords);
        

        if (!mediaCreated) {
            throw ErrorFactory.createError(errorTypes.DATABASE_ERROR, errorMessages.INSERT_ERROR_MEDIA);
        }

        let allMedia = await MediaEntrenamiento.findAll({
            where: {
                idEntrenamiento,
            },
            include: {
                model: Documento,
            }
        });

        req.entrenamiento.media = allMedia;

        if ((req.path === '/entrenamientos' && req.method === 'POST') || (req.path === `/entrenamientos/${idEntrenamiento}` && rolUsuario === 'EQUIPO_ADMIN')) {
            next();
        }else{
            return res.status(200).json({
                message: 'Multimedia entrenamiento cargada correctamente',
                result: { allMedia }
            })
        }

    } catch (error) {        

        let STATUS_CODE = 500;
        let MESSAGE = 'Error interno del servidor';

        if (error.name) {
            STATUS_CODE = error.statusCode;
            MESSAGE = error.message;
        }
        console.log(STATUS_CODE, MESSAGE);

        return res.status(STATUS_CODE).json({ message: MESSAGE });
    }

}