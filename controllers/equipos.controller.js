import Equipo from "../models/Equipo.js";

export const create = async (req, res) => {
    
    let { nombre, url, activo } = req.body;

    if(!nombre || !url || !activo){
        return res.status(400).json({ message: "All fields are required" });
    }
    
    let data = {
        nombre,
        url,
        activo,
        //restan handlear más campos
    }

    try {
        const newEquipo = await Equipo.create(data);
        return res.status(200).json(newEquipo);
    } catch (error) {
        console.error(`Error al crear nuevo equipo \n${error}`);
        return res.status(500).json({message:"Internal server error"});
    }


}