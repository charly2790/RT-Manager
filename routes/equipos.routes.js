import { create } from '../controllers/equipos.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/equipos',create);

export default router;