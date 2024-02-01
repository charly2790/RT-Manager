import { getPayload, getToken } from '../helpers/tokenUtils.js'

export const verifyToken = async (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    console.log(`token ${token}`);
    if (!token) {
        console.error("Token no enviado en la peticion");
        return res.status(401).json({ message: "Token not provided" });
    }

    const payload = getPayload(token);

    if(!payload){
        console.warn("Token no valido");
        return res.status(401).json({ message: "Token not valid" });
    }

    const tokenFound = await getToken(`${payload.idEquipo}_${payload.email}`);
    console.log(`token found ${tokenFound}`);

    if(!tokenFound) {
        console.warn(`Sesión vencida para el usuario ${payload.email}`);
        return res.status(401).json({ message: "Token not valid" });
    }

    if( tokenFound !== token){
        console.warn(`Token enviado distinto del token activo para el usuario ${payload.email}`);
        return res.status(401).json({ message: "Token not valid" });
    }
    
    //Agrego payload al usuario p/ completar campos "creadoPor"/"modificadoPor"
    req.body.idUserLogged = payload.idUserLogged;

    next();

}