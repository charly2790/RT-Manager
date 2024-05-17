import { Router } from 'express';
import { create, getTiposSesion } from '../controllers/tiposSesion.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.route('/tiposSesion')
    .post(verifyToken, verifyPermisos("TIPO-SESION_CREATE"), create)
    .get (verifyToken, verifyPermisos("TIPO-SESION_READ"), getTiposSesion)

export default router;