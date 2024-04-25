import { Router } from 'express';
import { create } from '../controllers/permisosRol.crontroller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyPermisos } from '../middlewares/rbac.middleware.js';


const router = Router();

router.post('/permisosRol', verifyToken, verifyPermisos('PERMISO-ROL_CREATE'),create);

export default router;