import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { create } from '../controllers/usuarios.controller.js';
import { createSuscripcion } from '../controllers/suscripciones.controller.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.post('/usuarios', verifyToken, verifyPermisos("USUARIO_CREATE"), create, createSuscripcion);

export default router;