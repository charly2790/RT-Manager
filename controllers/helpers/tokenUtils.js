import { config } from "../../config/config.js"
import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, config.secret);        
        return token;
    }catch (error) {
        console.error(error);
        return undefined;
    }
}
