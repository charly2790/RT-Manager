import Permiso from "../models/Permiso.js";

export const create = async (req, res) => {
    let { descripcion, idUsuarioCreador, idUsuarioUltimaModificacion } = req.body;

    if(!descripcion || !idUsuarioCreador || !idUsuarioUltimaModificacion){
        return res.status(400).json({ message: "All fields are required" });
    }

    let data = {
        descripcion,
        idUsuarioCreador,
        idUsuarioUltimaModificacion
    };

    try{
        const newPermiso = await Permiso.create(data);
        res.json(newPermiso)
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }
}