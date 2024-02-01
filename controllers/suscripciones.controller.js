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