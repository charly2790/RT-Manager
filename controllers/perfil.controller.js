import { defaultProfileImageUrl } from '../utils/constants.js';
import { v2 as cloudinary } from 'cloudinary';
import { validationResult } from 'express-validator';
import Perfil from '../models/Perfil.js';

export const create = async (req, res) => {

    console.log('req.body-->',req.body);

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
        telefono: req.body.tel,
        redesSociales: {
            Facebook: req.body.Facebook || null,
            Instagram: req.body.Instagram || null,
            X: req.body.X || null
        },
    }

    try {
        const result = await Perfil.create(newProfile);
        return res.status(200).json({ status: 'ok', data: result });
    } catch (error) {
        console.error(`Error al crear el perfil \n${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }      
}

export const update = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({ message: 'Perfil actualizado correctamente' });
}