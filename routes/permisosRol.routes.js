import { Router } from 'express';
import { create } from '../controllers/permisosRol.crontroller.js';

const router = Router();

router.post('/permisosRol', create);

export default router;