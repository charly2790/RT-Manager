import { Router } from 'express';
import { create } from '../controllers/permisosRol.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';


const router = Router();

router.post('/permisosRol', verifyToken, verifyPermisos('PERMISO-ROL_CREATE'),create);

export default router;