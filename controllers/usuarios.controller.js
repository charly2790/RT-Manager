import json from "body-parser";
import Usuario from "../models/usuario.js";


export const create = async (req, res) => {                    
        
    let data = {            
        email: req.body.email,
        password: req.body.password,            
        idRol: req.body.idRol,
        fecha_inicio: req.body.fecha_inicio,
    };

    console.log(`data: ${JSON.stringify(data)}`);
    try{            
        const newUser = await Usuario.create(data);
        res.json(newUser)
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }

}

export const sayhello = (req, res) => {
    res.send('¡Hola mundo!');
} 