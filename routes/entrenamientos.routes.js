import { create } from '../controllers/entrenamientos.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';
import { upload } from '../middlewares/multipartFormData.middleware.js';

const router = Router();

router.post('/entrenamientos', verifyToken, verifyPermisos('ENTRENAMIENTO_READ'), upload.none(), create);

export default router;


