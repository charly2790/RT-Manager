import _ from "lodash";
import { ErrorFactory } from "../utils/ErrorFactory.js";
import { errorMessages } from "../utils/ErrorMessages.js";
import { errorTypes } from "../utils/ErrorTypes.js";
import { formatToLocalTime } from "../helpers/Utils.js";
import { validationResult } from "express-validator";
import Documento from "../models/Documento.js";
import Entrenamiento from "../models/Entrenamiento.js"
import MediaEntrenamiento from "../models/MediaEntrenamiento.js";

export const create = async (req, res, next) => {

    console.log({
        método: req.method,
        ruta: req.path,
        rutaCompleta: req.originalUrl,
        baseUrl: req.baseUrl,
        protocolo: req.protocol
    });    

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, errors.array().map(error => error.msg)[0]);
        }

        const {
            comentario = null,
            distancia,
            idSesion = null,
            idUserLogged,
            link = null,
            rpe = null,
            tiempoNeto,
            tiempoTotal,
        } = req.body;

        const { nombre: rolUsuario } = req.rol;

        let data = {
            comentario,
            idSesion,
            link,
            rpe,
            ...(rolUsuario === 'EQUIPO_ADMIN') && {            
                distancia,
                tiempoNeto: new Date(tiempoNeto).toTimeString().split(' ')[0],
                tiempoTotal: new Date(tiempoTotal).toTimeString().split(' ')[0],
                usuarioCreador: idUserLogged,
                usuarioModificador: idUserLogged,
            }
        };        

        let newEntrenamiento = await Entrenamiento.create(data);

        if (!newEntrenamiento) {
            throw ErrorFactory.createError(errorTypes.DATABASE_ERROR, errorMessages.INSERT_ERROR);
        }

        if (!_.isNil(req.documentos) && req.documentos.length > 0) {

            let { idEntrenamiento } = newEntrenamiento;

            let newMedia = req.documentos.map(documento => {

                let { idDocumento } = documento;
                return {
                    idEntrenamiento,
                    idDocumento,
                }
            });

            let mediaCreated = await MediaEntrenamiento.bulkCreate(newMedia);

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

            newEntrenamiento.media = allMedia;
        }
        
        if(req.path === '/entrenamientos' && req.method === 'POST'){
            next();
        }else{
            return res.status(200).json({ message: 'Entrenamiento cargado con éxito', entrenamiento: newEntrenamiento });
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

export const patch = async (req, res) => {

    try {
        const { idEntrenamiento } = req.params;
        const { idSesion, idUsuario } = req.body;

        if (!idEntrenamiento || !idSesion) {
            throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, 'Parámetros faltantes o no validos');
        }

        const updatedFields = { ...req.body };

        delete updatedFields.idSesion;
        delete updatedFields.idUsuario;

        const entrenamiento = await Entrenamiento.findOne({
            where: {
                idEntrenamiento,
                idSesion
            }
        });

        if (_.isEmpty(entrenamiento)) throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, `No se ha encontrado un entrenamiento asociado al id ${idEntrenamiento}`);

        if (!_.isNil(updatedFields.tiempoNeto)) {
            updatedFields.tiempoNeto = formatToLocalTime(updatedFields.tiempoNeto);
        }

        if (!_.isNil(updatedFields.tiempoTotal)) {
            updatedFields.tiempoTotal = formatToLocalTime(updatedFields.tiempoTotal);
        }

        const affectedRows = await entrenamiento.update({ ...updatedFields });        

        return res.status(200).json({
            message: 'Entrenamiento Actualizado correctamente',
            result: { affectedRows }
        })

    } catch (error) {

        let STATUS_CODE = 500;
        let MESSAGE = 'Error interno del servidor';

        switch (error.name) {
            case errorTypes.VALIDATION_ERROR:
                STATUS_CODE = error.statusCode;
                MESSAGE = error.message;
                break;
        }

        return res.status(STATUS_CODE).json({ message: MESSAGE });
    }

}