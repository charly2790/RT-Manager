import { Router } from 'express';
import { create } from '../controllers/permisos.controller.js';

const router = Router();

router.post('/permisos', create);

export default router;