import json from "body-parser";
import Perfil from "../models/Perfil.js";
import Suscripcion from "../models/Suscripcion.js";
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

export const getUsuarios = async (req, res) => {

    let { idEquipo } = req.query;

    if(!idEquipo) return res.status(400).json({message: "All fields are required"});
    
    let usuarios = [];
    const attributes = ['idUsuario','email','idRol','fechaInicio','fechaFin','estado'];

    try {
        usuarios = await Usuario.findAll({ attributes, 
            include: [{ model: Perfil},{ model: Suscripcion, where: { idEquipo, activo: true }}] });
    } catch (error) {
        console.log(`Error al recuperar usuarios: \n ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }

    if(usuarios.length > 0 ) 
        return res.status(200).json({ usuarios })
    else
        return res.status(200).json("No users found");
}