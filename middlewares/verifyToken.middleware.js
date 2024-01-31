import { getPayload } from '../helpers/tokenUtils.js'

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    console.log(`token ${token}`);
    if (!token) {
        console.error("Token no enviado en la peticion");
        return res.status(401).json({ message: "Token not provided" });
    }

    const payload = getPayload(token);

    if(!payload){
        console.log("Token no valido");
        return res.status(401).json({ message: "Token not valid" });
    }

    console.log(`El payload es: ${JSON.stringify(payload)}`);
    next();

}