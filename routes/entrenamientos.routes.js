import { create, patch } from '../controllers/entrenamientos.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';
import { upload } from '../middlewares/multipartFormData.middleware.js';

const router = Router();

router.post('/entrenamientos', verifyToken, verifyPermisos('ENTRENAMIENTO_READ'), upload.none(), create);
router.patch('/entrenamientos/:idEntrenamiento', verifyToken, verifyPermisos('ENTRENAMIENTO_READ'), upload.none(), patch);

export default router;


