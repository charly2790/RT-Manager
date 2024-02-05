import Rol from "../models/Rol.js";

export const create = async (req, res) => {
    let {nombre, estado, idUsuarioCreador, idUsuarioModificador } = req.body;

    if(!nombre || !estado || !idUsuarioCreador || !idUsuarioModificador){
        return res.status(400).json({ message: "All fields are required" });
    }

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