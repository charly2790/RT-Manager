import Suscripcion from "../models/Suscripcion.js";

export const createSuscripcion = async (req, res, next) => {
    
    let { idUsuario, idEquipo, idUserLogged } = req.body;

    if(!idUsuario || !idEquipo || !idUserLogged){
        return res.status(400).json({ message: "All fields are required" });
    }

    let data = {
        idUsuario: idUsuario,
        idEquipo,
        activo: 1,
        fechaCreacion: new Date(),
        idUsuarioCreador: idUserLogged,
        idUsuarioModificador: idUserLogged,
    };

    try {
        const newSuscripcion = await Suscripcion.create(data);
        res.json(newSuscripcion);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.json(error.message);
    }
}

export const getSuscripciones = async (req, res) => {
    
    let { idEquipo } = req.query;

    if(!idEquipo) return res.status(400).json({message: "All fields are required"});
        
    let suscripciones = [];

    try {
        suscripciones = await Suscripcion.findAll({ where: { idEquipo, activo: true } } );
    } catch (error) {
        console.log(`Error al recuperar suscripciones: \n ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }

    if(suscripciones.length > 0){
        return res.status(200).json({ suscripciones })
    }else{
        return res.status(200).json("No subscriptions found");
    }
}