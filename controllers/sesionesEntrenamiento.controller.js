import _ from "lodash";
import { completarFecha } from "../helpers/Utils.js";
import { ErrorFactory } from "../utils/ErrorFactory.js";
import { errorTypes } from "../utils/ErrorTypes.js";
import { feedbackMessages } from "../utils/FeedbackMessages.js";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js"
import isoWeek from "dayjs/plugin/isoWeek.js"
import Documento from "../models/Documento.js";
import Entrenamiento from "../models/Entrenamiento.js";
import EstadoSesion from "../models/EstadoSesion.js";
import MediaEntrenamiento from "../models/MediaEntrenamiento.js";
import SesionEntrenamiento from "../models/SesionEntrenamiento.js";
import TipoSesion from "../models/TipoSesion.js";
import Suscripcion from "../models/Suscripcion.js";
import { Op } from "sequelize";

dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);

const validarSesiones = (sesiones) => {

    return sesiones.reduce((result, sesion) => {

        const { idSuscripcion, fechaSesion, Objetivo, idTipoSesion } = sesion;

        if (!idSuscripcion || !fechaSesion || !Objetivo || !idTipoSesion) {
            result.valid = false;
            result.message.push(`Fecha: ${fechaSesion} - Objetivo: ${Objetivo} | Datos faltantes`);
        }

        if (existeSesion(sesion)) {
            result.valid = false;
            result.message.push(`Fecha: ${fechaSesion} - Objetivo: ${Objetivo} | Ya existe una sesión para esta suscripción`);
        }

        return result;
    }, { valid: true, message: [] })

}
const existeSesion = async ({ idSuscripcion, idTipoSesion, fechaSesion, Objetivo }) => {

    let sesiones = [];

    try {
        sesiones = await SesionEntrenamiento.findAll({ where: { idSuscripcion, idTipoSesion, fechaSesion, Objetivo } });
        return sesiones.length > 0;
    } catch (error) {
        console.log(`Error al recuperar sesiones de entrenamiento \n ${error}`);
        return true;
    }

}
export const create = async (req, res) => {

    const { sesiones, idUserLogged } = req.body;

    const sesionesValidas = validarSesiones(sesiones);

    if (!sesionesValidas) {
        return res.status(400).json(sesionesValidas.message);
    }

    let data = sesiones.map(sesion => ({
        ...sesion,
        idUsuarioCreador: idUserLogged,
        idUsuarioModificador: idUserLogged
    }))

    try {
        let status = await SesionEntrenamiento.bulkCreate(data);
        return res.status(200).json(status)
    } catch (error) {
        console.error(`Error al crear la sesión de entrenamiento \n ${error}`);
        return res.status(500).json('Internal server error');
    }
}
export const getById = async (req, res) => {

    const { idSuscripcion } = req.query;

    if (!idSuscripcion) { return res.status(400).json('Missing fields') };

    try {
        let sesiones = await SesionEntrenamiento.findAll(
            {
                where: { idSuscripcion },
                include: [
                    {
                        model: Entrenamiento,
                        include: [{
                            model: MediaEntrenamiento,
                            include: [{ model: Documento }]
                        }]
                    },
                    { model: EstadoSesion },
                    { model: TipoSesion }]
            });

        if (sesiones.length > 0) {
            sesiones = sesiones.map(sesion => {
                if (!_.isEmpty(sesion.Entrenamiento)) {
                    const { tiempoNeto, tiempoTotal } = sesion.Entrenamiento;
                    sesion.Entrenamiento.tiempoNeto = completarFecha(tiempoNeto);
                    sesion.Entrenamiento.tiempoTotal = completarFecha(tiempoTotal);
                }
                return sesion;
            })
        }

        return res.status(200).json(sesiones)
    } catch (error) {
        console.log(`Error al recuperar sesiones de entrenamiento \n ${error}`);
        return res.status(500).json('Internal server error');
    }
}

export const updateStatus = async (req, res) => {

    try {
        const { idSesion } = req.body;
        const { rol } = req;

        if (!idSesion || !rol) {
            throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, 'Parámetros faltantes o no validos');
        }

        const sesion = await SesionEntrenamiento.findOne({
            where: {
                idSesion
            }
        })

        if (_.isNil(sesion)) {
            throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, `No se ha encontrado una sesion de entrenamiento asociada al id ${idSesion}`)
        }

        let newIdStatus = sesion.idEstado;

        switch (rol.nombre) {
            case 'EQUIPO_MEMBER':
                newIdStatus = 2; //ENVIADA
                break;
            case 'EQUIPO_ADMIN':
                newIdStatus = 4; //VALIDADA
                break;
        }

        const sesionUpdated = await SesionEntrenamiento.update({
            idEstado: newIdStatus
        },
            {
                where: { idSesion },
                returning: true //p/ retornar objeto actualiozado (solo postgres)
            })

        if (!sesionUpdated) {
            throw ErrorFactory.createError(errorTypes.VALIDATION_ERROR, 'No se ha podido actualizar el estado de la sesion de entrenamiento')
        }

        const [affectedRows, sesionEntrenamiento] = sesionUpdated;

        return res.status(200).json({ message: req.path === '/entrenamientos' ? feedbackMessages.CREATE_OK : feedbackMessages.UPDATE_OK, result: { affectedRows, sesionEntrenamiento } });

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

export const getResumen = async (req, res) => {

    //¿a que usuario?
    //¿Para que año?
    const { idSuscripcion } = req.params;
    const { idEquipo } = req.body;
            
    
    const fechaInicio = dayjs().startOf('year').day(0).toISOString('YYYY-MM-DD');
    const fechaFin = dayjs().endOf('year').day(6).toISOString('YYYY-MM-DD');    
    
    console.log('#️⃣  Inicio año runner: ',fechaInicio);
    console.log('#️⃣  Fin año runnner: ',fechaFin);
    
    try {
        const where = {
            idSuscripcion,
            fechaSesion: {
                [Op.between]:[fechaInicio, fechaFin]
            }

        };
        const order = [[ 'fechaSesion', 'ASC']];       

        let sesiones = await SesionEntrenamiento.findAll({            
            where,
            include: [{
                model: Entrenamiento,               
            }, {
                model: Suscripcion,
                where: {
                    idSuscripcion,
                    idEquipo,
                    activo: true
                },
            }
            ],
            order
        })

       /*  const sesionesMap = sesiones.map(sesion => {
            const sesionJSON = sesion.toJSON();
            return {
                ...sesionJSON,
                isoWeekOfYear: dayjs(sesion.fechaSesion).isoWeek()
                
            }
        }) */



        if(sesiones.length === 0){
            throw ErrorFactory.createError(errorTypes.NO_DATA_ERROR, feedbackMessages.NO_DATA_FOUND);            
        }        
        
        /* const fechaUltimaSesion = dayjs(sesiones[sesiones.length-1].fechaSesion);
        console.log('#️⃣  Fecha última sesión cargada: ', fechaUltimaSesion.toISOString('dd/mm/YYYY'));
        const fechaCorte = fechaUltimaSesion.endOf('month');
        console.log('#️⃣  La última sesión es:', fechaCorte.toISOString('dd/mm/YYYY')); */








        //inicio del año running

        return res.status(200).json({sesiones});

    } catch (error) {
        console.log(error.message);
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




    return res.status(200).json({ message: "Acá devolveriamos los datos" });


    /*   try {
          let sesiones = SesionEntrenamiento.findAll({
              where: { 
                  idSuscripcion
  
               },
              include:[{
                  model: Entrenamiento,                
              }]
          })
      } catch (error) {
          
      } */




}