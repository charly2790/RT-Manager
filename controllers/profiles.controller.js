export const create = async (req, res) => {    
    
    return res.status(200).json({message: 'Perfil creado correctamente'});
}

export const update = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({message: 'Perfil actualizado correctamente'});
}