import multer from 'multer'
import cloudinary from 'cloudinary'
import { config } from '../config/config.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryAPIKey, 
    api_secret: config.cloudinaryAPISecret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'ProfilePictures', // Carpeta donde se almacenarán las imágenes
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Formatos permitidos        
    },
});

// https://res.cloudinary.com/dev7swtde/image/upload/v1727955428/ProfilePictures/gmvh9wafywvjihcdpvv0.jpg
/* 
PARA ALMACENAMIENTO LOCAL
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');        
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Renombra el archivo
    }
}) */

export const upload = multer({storage});