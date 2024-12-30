import { create, patch, test } from '../controllers/entrenamientos.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import { FOLDERS, ORIGINS, STORAGE_TYPES } from '../middlewares/types/types.js';
import { handleStorage } from '../middlewares/handleStorage.middleware.js';

const router = Router();

router.post( 
    '/entrenamientos', 
    verifyToken,
    verifyPermisos('ENTRENAMIENTO_READ'),
    handleStorage(
        ['jpg', 'png', 'jpeg', 'gif'], 
        'archivos', 
        FOLDERS.TRAINING, 
        false, 
        STORAGE_TYPES.CLOUDINARY), 
        test);
router.patch('/entrenamientos/:idEntrenamiento', verifyToken, verifyPermisos('ENTRENAMIENTO_READ'), upload().none(), patch);

export default router;


