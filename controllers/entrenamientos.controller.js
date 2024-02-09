import Entrenamiento from "../models/Entrenamiento.js"

export const create = async (req, res) => {

    const { idSesion, distancia, tiempo, rpe, link, idUserLogged } = req.body;

    if( !idSesion || !distancia || !tiempo || !rpe){
        return res.status(400).json({ message: 'Missing fields'});
    }

    const data = {
        idSesion,
        distancia,
        tiempo,
        rpe,
        link:link?link:undefined,
        usuarioCreador:idUserLogged,
        usuarioModificador:idUserLogged,
    }

    try{
        const newEntrenamiento = await Entrenamiento.create(data);
        return res.status(200).json(newEntrenamiento);
    }catch(error){
        console.error(`Error al crear entrenamiento \n${error}`);
        return res.status(500).json({message:'internal server error'})
    }

}