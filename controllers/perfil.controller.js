import { defaultProfileImageUrl } from '../utils/constants.js';
import { v2 as cloudinary } from 'cloudinary';
import { validationResult } from 'express-validator';
import Perfil from '../models/Perfil.js';

const redesSociales = ['Facebook', 'Instagram', 'X']

export const create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let url = defaultProfileImageUrl;

    if (req.file) {
        url = cloudinary.url(req.file.filename,
            {
                transformation: [{
                    quality: 'auto',
                    fetch_format: 'auto',
                }, {
                    width: 400,
                    height: 400,
                    crop: 'fill',
                    gravity: 'auto',

                }]
            });
    }

    const newProfile = {
        idUsuario: req.body.idUsuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombreCompleto: `${req.body.nombre} ${req.body.apellido}`,
        apodo: req.body.apodo || null,
        genero: req.body.genero,
        fechaNacimiento: req.body.fechaNacimiento,
        avatar: url,
        telefono: req.body.telefono,
        redesSociales: {
            Facebook: req.body.Facebook || null,
            Instagram: req.body.Instagram || null,
            X: req.body.X || null
        },
    }

    try {
        const result = await Perfil.create(newProfile);
        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error al crear el perfil \n${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const update = async (req, res) => {

    const userId = req.params.id;
    let updatedFields = { ...req.body };

    const perfil = await Perfil.findOne({ idUsuario: userId });

    if (!perfil) return res.status(200).json({ message: "Perfil no encontrado" });

    updatedFields.redesSociales = {...perfil.redesSociales};
    
    redesSociales.forEach(red => {        
        if (updatedFields[red]) {            
            updatedFields.redesSociales[red] = updatedFields[red];
            delete updatedFields[red]
        }
    })    
    
    try {
        perfil.update({ ...updatedFields });
        perfil.save();
        return res.status(200).json({ message: 'Perfil Actualizado correctamente', perfil });
    } catch (error) {
        console.error(`Error al buscar suscripción:\n ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }


}