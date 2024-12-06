import PermisoPorRol from "../models/PermisoPorRol.js";
import Rol from "../models/Rol.js";
import Permiso from "../models/Permiso.js";

export const verifyPermisos = (permisoRequerido) => {
    
    console.log('PERMISO REQUERIDO--->', permisoRequerido);
    
    return async (req, res, next) => {


        const recurso = permisoRequerido.split("_")[0];        

        const rolUsuario = await Rol.findOne({
            where: {
                idRol: req.body.idRol,
            },
            include: Permiso,
        })

        const { Permisos } = rolUsuario;

        const permisosUsuario = Permisos.map((permiso)=>{ return permiso.descripcion});

        console.log(`----------------------------------------------------------`);
        console.log(`permisos del usuario: ${permisosUsuario}`);
        console.log(`permiso requerido: ${permisoRequerido}`);
        console.log(`----------------------------------------------------------`);        

        if(permisosUsuario.includes(`${recurso}_ALL`) || 
            permisosUsuario.includes(permisoRequerido)){            
            req.rol = { idRol: rolUsuario.idRol, nombre: rolUsuario.nombre };            
            next();
        }else{
            return res.status(401).json({message:"Permisos insuficientes"});
        }        
    }
    
}