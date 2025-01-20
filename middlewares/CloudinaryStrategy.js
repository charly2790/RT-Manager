import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from '../config/config.js';
import { FOLDERS } from './types/types.js';
import { StorageStrategy } from "./StorageStrategy.js";
import cloudinary from 'cloudinary'
import Documento from '../models/Documento.js';
import multer from "multer";
import _ from 'lodash';


export class CloudinaryStrategy extends StorageStrategy {

    constructor() {
        super();
    }
   
   setSettings(settings){
       this.settings = settings;
   }

    getSettings() {
        return this.settings;
    }

    upload = (req, res, next) =>{

        const {folder, allowed_formats, fieldName, isSingle} = this.getSettings();
        
        try {
            cloudinary.v2.config({
                cloud_name: config.cloudinaryName,
                api_key: config.cloudinaryAPIKey,
                api_secret: config.cloudinaryAPISecret
            });

            let storage = new CloudinaryStorage({
                cloudinary: cloudinary.v2,
                params: {
                    folder,
                    allowed_formats,
                },
            });

            let uploadMiddleware;

            if(isSingle){
                uploadMiddleware = multer({ storage }).single(fieldName);
            } else{
                uploadMiddleware = multer({ storage }).array(fieldName,4);
            }

            uploadMiddleware(req, res, async (err) => {

                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                                
                if(!_.isNil(req.files) && req.files.length >= 0){                    
                    let newDocuments = req.files.map( file => ({ link: file.path, idCategoria: 1}));

                    const newDocumentRecords = await Documento.bulkCreate(
                        newDocuments, 
                        {
                            returning: true
                        });
                    req.documentos = newDocumentRecords;   
                    console.log('req.documentos--->', req.documentos);
                }
                next();
            });
        } catch (error) {
            console.log('Error Peugeot 504');
        }
    }    
}