import json from "body-parser";
import Usuario from "../models/Usuario.js";


export const create = async (req, res) => {
        
    let {idEquipo, email, password, idRol, fecha_inicio } = req.body;

    let data = {            
        email,
        password,            
        idRol,
        fecha_inicio,
    };
            
    try{            
        const newUser = await Usuario.create(data);
        res.json(newUser)
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }
}
 