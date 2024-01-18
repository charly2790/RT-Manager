import json from "body-parser";
import Usuario from "../models/usuario.js";


export default {
    create: async (req, res) => {                
                        
        let result = Usuario();

        let data = {            
            email: req.body.email,
            password: req.body.password,            
            idRol: req.body.idRol,
            fecha_inicio: req.body.fecha_inicio,
        };

        try{            
            const newUser = await Usuario.create(data);
            res.json(newUser)
        }catch(error){
            console.log(`Error: ${error}`);
            res.json(error.message);
        }

    }
}