import { Router } from 'express';
import { create, getEstadosSesion } from '../controllers/estadosSesion.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.route('/estadosSesion')
    .post(verifyToken, verifyPermisos("ESTADO-SESION_CREATE"), create)
    .get (verifyToken, verifyPermisos("ESTADO-SESION_READ"), getEstadosSesion)

export default router;