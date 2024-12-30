import multer from 'multer'
import cloudinary from 'cloudinary'
import { FOLDERS } from './types/types.js';
import { config } from '../config/config.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryAPIKey, 
    api_secret: config.cloudinaryAPISecret
});

const getStorage = (folder) =>{            
    return new CloudinaryStorage({
        cloudinary: cloudinary.v2,
        params: {
            folder,
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
        },
    });
}

export const upload = (origin = 'Default') => {  
    const storage = getStorage(FOLDERS[origin]);
    return multer({storage});    
}