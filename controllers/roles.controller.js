import Rol from "../models/Rol.js";

export const create = async (req, res) => {
    let {nombre, estado, idUsuarioCreador, idUsuarioModificador } = req.body;

    let data = {
        nombre,
        estado,
        idUsuarioCreador,
        idUsuarioModificador
    }

    try{
        const newRol = await Rol.create(data);
        res.json(newRol)
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }
}