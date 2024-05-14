import Usuario from "../models/Usuario.js"
import Suscripcion from "../models/Suscripcion.js";
import { generateToken } from "../helpers/tokenUtils.js";
import { redisClient } from "../config/database.js";
import { config } from "../config/config.js";


export const login = async (req, res) => {

    const { email, password, idEquipo } = req.body;

    if (!email || !password || !idEquipo) return res.status(400).json({ message: "All fields are required" });

    let usuario,suscripcion;

    try {
        usuario = await Usuario.findOne({ where: { email: email } });
    } catch (error) {
        console.error(`Error al buscar usuario:\n ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }

    if(!usuario) return res.status(401).json({ message:"User or password invalid" });

    let auth = await usuario.autenticarPassword(password);

    if (!auth) return res.status(401).json({ message: "Authentication failed" });

    try {
        suscripcion = await Suscripcion.findOne({ where: { idUsuario: usuario.idUsuario, idEquipo: idEquipo } });
    } catch (error) {
        console.error(`Error al buscar suscripción:\n ${error}`);
        return res.status(500).json({ message: "Internal server error" });       
    }

    if(!suscripcion) return res.status(401).json({message:"Suscripción inactiva"});    

    if(suscripcion.activo === 0) return res.status(401).json({message:"Suscripción inactiva"});

    const key = `${idEquipo}_${email}`;
    let token;

    try{
        token = await redisClient.get(key)
    }catch(error){
        console.error(`Error al obtener key de redis:\n ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }

    if(token) {
        console.log(`Token encontrado en redis`);
        return res.status(200).json({ token });
    }

    const { idUsuario:idUserLogged, idRol } = usuario;    

    token = generateToken({ idUserLogged, idRol, idEquipo, email });

    if (!token) return res.status(500).json({ message: "Internal server error" });

    const { tokenTTL } = config
    
    try {
        const saveResultRedis = await redisClient.set(key,token,{'EX': tokenTTL});
        console.log(`Nuevos datos almacenados en redis ${saveResultRedis}`);
        return res.status(200).json({ token });

    } catch (error) {
        console.error(`Error al guardar key en redis:\n ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }

}