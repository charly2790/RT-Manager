import { Router } from 'express';
import { create } from '../controllers/permisos.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';

const router = Router();

router.post('/permisos',verifyToken,verifyPermisos('PERMISO_CREATE'),create);

export default router;