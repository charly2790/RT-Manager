import Entrenamiento from "../models/Entrenamiento.js"

export const create = async (req, res) => {    
    
    const { 
        comentario, 
        distancia,
        idSesion, 
        idUserLogged,
        link, 
        rpe, 
        tiempoNeto, 
        tiempoTotal, 
    } = req.body;        

    if( !idSesion || !distancia || !tiempoTotalSesion || !tiempoNetoSesion || !rpe){
        return res.status(400).json({ message: 'Missing fields'});
    }    

    const data = {
        comentario,
        distancia,
        idSesion,
        link:link?link:undefined,
        rpe,
        tiempoNeto: new Date(tiempoNeto).toTimeString().split(' ')[0],
        tiempoTotal: new Date(tiempoTotal).toTimeString().split(' ')[0],
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