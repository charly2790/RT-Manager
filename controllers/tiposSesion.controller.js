import TipoSesion from "../models/TipoSesion.js";

export const create = async (req, res) =>{

    let { descripcion, idUserLogged } = req.body;

    if(!descripcion){
        return res.status(400).json({ message: "All fields are required" });
    }

    let data = {
        descripcion,
        idUsuarioCreador: idUserLogged,
        idUsuarioModificador: idUserLogged
    };

    try {
        const newTipoSesion = await TipoSesion.create(data);
        return res.json(newTipoSesion);
    } catch (error) {
        console.error(`Error al crear el tipo de sesión \n${error}`);
        res.json({message:'internal server error'});
    }
}

export const getTiposSesion = async (req, res) => {
    
    let tiposSesion = [];

    try {
        tiposSesion = await TipoSesion.findAll();
        return res.status(200).json(tiposSesion);
    } catch (error) {
        console.log(`Error al obtener tipos de sesiones de entrenamiento: ${error.message}`);
        return res.status(500).json('Internal server error');
    }

}