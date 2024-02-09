import SesionEntrenamiento from "../models/SesionEntrenamiento.js";

export const create = async (req, res) => {
    
    const { idSuscripcion, fechaSesion, Objetivo, Completado, idTipoSesion, idEdicionCarrera, idUserLogged } = req.body;

    if(!idSuscripcion || !fechaSesion || !Objetivo ||  !idTipoSesion){
        return res.status(400).json('Missing fields');
    }

    let data = {
        idSuscripcion,
        fechaSesion,
        Objetivo,
        Completado: false,
        idTipoSesion,
        idEdicionCarrera: idEdicionCarrera?idEdicionCarrera:undefined,
        idUsuarioCreador: idUserLogged,
        idUsuarioModificador: idUserLogged
    };

    try {
        let newSesionEntrenamiento = await SesionEntrenamiento.create(data);
        return res.status(200).json(newSesionEntrenamiento)
    } catch (error) {
        console.error(`Error al crear la sesión de entrenamiento \n ${error}`);
        return res.status(500).json('Internal server error');
    }
}