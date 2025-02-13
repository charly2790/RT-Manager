import { create, getEquipoById } from '../controllers/equipos.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router = Router();

router.route('/equipos')
    .post(verifyToken, create)

router.route('/equipos/:idEquipo')
    .get(verifyToken, getEquipoById)


export default router;