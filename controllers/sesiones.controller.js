import _ from "lodash"
import { config } from "../config/config.js";
import { generateToken, getPayload, getToken, deleteToken } from "../helpers/tokenUtils.js";
import { redisClient } from "../config/database.js";
import Perfil from "../models/Perfil.js"
import Rol from "../models/Rol.js";
import Suscripcion from "../models/Suscripcion.js";
import Usuario from "../models/Usuario.js"


export const login = async (req, res) => {

    const { email, password, idEquipo } = req.body;

    if (!email || !password || !idEquipo) return res.status(400).json({ message: "All fields are required" });

    let usuario,suscripcion;

    try {
        usuario = await Usuario.findOne({ where: { email: email }, include: [{ model: Rol }, { model: Perfil}] });
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
    
    const { dataValues: { nombre } } = usuario.Rol;

    const userLogged = {
        idEquipo,
        idSuscripcion: suscripcion.idSuscripcion,
        idUsuario: usuario.idUsuario,
        idRol: usuario.idRol,
        rol: nombre,
        email: usuario.email,
        activo: suscripcion.activo,
        perfil: usuario.Perfil,
        token,
    }
    
    if(token) {
        console.log(`#Token activo para el usuario logueado. Se regenerará el mismo`);
        const result = await deleteToken(key);
        if(!_.isNil(result) && result > 0) {
            console.log('#Token eliminado')
        }
    }
    
    token = generateToken({ 
        idUserLogged: userLogged.idUsuario, 
        idRol: userLogged.idRol,
        idEquipo,
        email 
        });



    if (!token) return res.status(500).json({ message: "Internal server error" });

    const { tokenTTL } = config
    
    try {
        const saveResultRedis = await redisClient.set(key,token,{'EX': tokenTTL});
        userLogged.token = token;
        console.log(`#Nuevos datos almacenados en redis ${saveResultRedis}`);
        return res.status(200).json({ userLogged });

    } catch (error) {
        console.error(`#Error al guardar key en redis:\n ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const logout = async (req, res) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    console.log(`token ${token}`);
    if (!token) {
        console.error("Token no enviado en la peticion");        
    }

    const payload = getPayload(token);

    if(!payload){
        console.warn("Token no valido");        
    }

    const key = `${payload.idEquipo}_${payload.email}`;

    const tokenFound = await getToken(key);
    console.log(`token found ${tokenFound}`);

    if(!tokenFound) {
        console.warn(`Sesión vencida para el usuario ${payload.email}`);        
    }

    if( tokenFound !== token){
        console.warn(`Token enviado distinto del token activo para el usuario ${payload.email}`);        
    }

    let result = await deleteToken(key);

    if(!_.isNil(result) && result > 0){
        console.log('#Token eliminado correctamente');
    }
}