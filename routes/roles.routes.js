import { Router } from 'express';
import { create } from '../controllers/roles.controller.js';

const router = Router();

router.post('/roles', create);

export default router;