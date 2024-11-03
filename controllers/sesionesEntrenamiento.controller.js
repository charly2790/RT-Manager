import Entrenamiento from "../models/Entrenamiento.js";
import EstadoSesion from "../models/EstadoSesion.js";
import SesionEntrenamiento from "../models/SesionEntrenamiento.js";
import TipoSesion from "../models/TipoSesion.js";


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

    let data = sesiones.map(sesion =>({
        ...sesion,
        idUsuarioCreador: idUserLogged,
        idUsuarioModificador:idUserLogged
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
                    { model: Entrenamiento },
                    { model: EstadoSesion },
                    { model: TipoSesion }] 
            });
        return res.status(200).json(sesiones)
    } catch (error) {
        console.log(`Error al recuperar sesiones de entrenamiento \n ${error}`);
        return res.status(500).json('Internal server error');
    }
}