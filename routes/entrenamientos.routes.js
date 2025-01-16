import { create, patch } from '../controllers/entrenamientos.controller.js';
import { FOLDERS, ORIGINS, STORAGE_TYPES } from '../middlewares/types/types.js';
import { handleStorage } from '../middlewares/handleStorage.middleware.js';
import { Router } from 'express';
import { updateStatus } from '../controllers/sesionesEntrenamiento.controller.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import { validationRules } from '../rules/entrenamiento.rules.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

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
        validationRules, 
        create,
        updateStatus
    );
router.patch('/entrenamientos/:idEntrenamiento', verifyToken, verifyPermisos('ENTRENAMIENTO_READ'), upload().none(), patch);

export default router;


