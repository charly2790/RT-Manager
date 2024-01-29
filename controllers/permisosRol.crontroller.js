import PermisoRol from "../models/PermisoPorRol.js";

export const create = async (req, res) => {
    let { idRol,idPermiso } = req.body;

    let data = {
       idRol,
       idPermiso
    };

    try{
        const newPermisoRol = await PermisoRol.create(data);
        res.json(newPermisoRol)
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }
}