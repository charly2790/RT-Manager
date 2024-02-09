import { Router } from 'express';
import { create } from '../controllers/tiposSesion.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.post('/tiposSesion',verifyToken, verifyPermisos("TIPOS-SESION_CREATE"), create);

export default router;