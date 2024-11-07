import EstadoSesion from "../models/EstadoSesion.js";

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
        const newEstadoSesion = await EstadoSesion.create(data);
        return res.json(newEstadoSesion);
    } catch (error) {
        console.error(`Error al crear el estado de sesión \n${error}`);
        res.json({message:'internal server error'});
    }
}

export const getEstadosSesion = async (req, res) => {
    
    let estadosDeSesion = [];

    try {
        estadosDeSesion = await EstadoSesion.findAll();
        return res.status(200).json({estadosDeSesion});
    } catch (error) {
        console.log(`Error al obtener estados de sesiones de entrenamiento: ${error.message}`);
        return res.status(500).json('Internal server error');
    }

}