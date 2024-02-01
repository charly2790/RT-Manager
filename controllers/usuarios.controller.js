import json from "body-parser";
import Usuario from "../models/Usuario.js";


export const create = async (req, res, next) => {
        
    let {idEquipo, email, password, idRol, fecha_inicio } = req.body;
    
    let data = {            
        email,
        password,            
        idRol,
        fecha_inicio,
    };
            
    try{            
        const newUser = await Usuario.create(data);
        
        if(newUser && idEquipo){
            req.body.idUsuario = newUser.idUsuario;
            next();
        }else{
            res.json(newUser);
        }                
    }catch(error){
        console.log(`Error: ${error}`);
        res.json(error.message);
    }

}
 