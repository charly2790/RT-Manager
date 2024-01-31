import { config } from "../config/config.js"
import jwt from 'jsonwebtoken';

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

const getToken = async (redisClient, key) => {
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