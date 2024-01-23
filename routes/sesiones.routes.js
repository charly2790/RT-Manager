import { Router } from 'express'
import { login } from '../controllers/sesiones.controller.js'

const router = Router();

router.post('/login', login);

export default router;