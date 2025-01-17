import { config } from "../config/config.js"
import jwt from 'jsonwebtoken';
import { redisClient } from "../config/database.js";

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, config.secret);
        return token;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getPayload = (token) => {
    let payload;

    try {
        payload = jwt.verify(token, config.secret);
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
    return payload;
}

export const getToken = async (key) => {
    //busca un token con la key recibida como parámetro en redis    
    let tokenFound;

    try {
        tokenFound = await redisClient.get(key);        
    } catch (error) {
        console.error(error);
        return undefined;
    }

    return tokenFound;
}

export const deleteToken = async (key) => {
    
    let result;

    try {
        result = await redisClient.del(key)
    } catch (error) {
        console.log('Error al intentar borrar key de redis: ', error.message);
    }

    return result;
}