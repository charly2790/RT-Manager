import { create } from '../controllers/entrenamientos.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.post('/sesionesEntrenamiento',verifyToken,verifyPermisos('ENTRENAMIENTO-CREATE'),create);

export default router;


