import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { create, getUsuarios } from '../controllers/usuarios.controller.js';
import { createSuscripcion } from '../controllers/suscripciones.controller.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.route('/usuarios')
    .post( verifyToken, verifyPermisos("USUARIO_CREATE"), create, createSuscripcion)
    .get( verifyToken, verifyPermisos("USUARIO_READ"), getUsuarios);
router.post('/usuarios/admin', create, createSuscripcion);


export default router;