import Usuario from "../models/usuario.js"
import jwt from 'jsonwebtoken';
import { config } from "../config/config.js"

export const login = async (req, res) => {
        
    const { email, password, idEquipo } = req.body;    
    
    let usuario;
    
    try{
        usuario = await Usuario.findOne({where: {email: email}});
    }catch(error){                
        return res.status(401).json({message:"falló autenticación"});
    }

    let auth = await usuario.autenticarPassword(password);

    if(!auth) return res.status(401).json({message:"falló autenticación"});

    const { secret } = config; 

    const token = jwt.sign({email, idEquipo},secret);

    return res.status(200).json({token});

    // usuario.login(email,password);

    // if(!usuario) return res.status(401).send('Credenciales incorrectas');

    res.json(usuario);

}