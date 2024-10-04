import { v2 as cloudinary } from 'cloudinary';

export const create = async (req, res) => {

    console.log('req.file -> ', req.file);
    console.log('image url -> ', req.file.path);
    console.log('image original name -> ', req.file.originalname);

    const url = cloudinary.url(req.file.filename,
        {
            transformation: [{
                quality: 'auto',
                fetch_format: 'auto',
            },{
                width: 400,
                height: 400,
                crop: 'fill',
                gravity: 'auto',

            }]
        });

    console.log('url -> ', url);

    //1) recuperar url de cloudinary de la imagen
    //2) recuperar resto de los campos
    //3) almacenar en base de datos
    //4) retornar nuevo profile creado como respuesta (ver/estudiar forma más óptima de hacerlo)
    
    return res.status(200).json({ message: 'Perfil creado correctamente' });
}

export const update = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({ message: 'Perfil actualizado correctamente' });
}