import { CloudinaryStrategy } from "./CloudinaryStrategy.js";
import { StorageContext } from "./StorageContext.js";
import { STORAGE_TYPES } from "./types/types.js"

export const handleStorage = (
    allowed_formats,
    fieldName,
    folder,
    isSingle = true,
    storageType,
) => {

    return async(req, res, next) => {

        let strategy;
        let settings;

        switch(storageType){
            case STORAGE_TYPES.LOCAL:
                break;
            case STORAGE_TYPES.CLOUDINARY:                
                strategy = new CloudinaryStrategy();
                settings = {
                    folder,
                    allowed_formats,
                    fieldName,
                    isSingle
                }
                break;
            default:
                return res.status(400).json({ message: 'Tipo de almacenamiento no soportado' });                
        }
                
        const storageContext = new StorageContext(strategy);
        storageContext.setSettings(settings);
        storageContext.upload(req, res, next);
    }
    

}