import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { create } from '../controllers/usuarios.controller.js';
import { createSuscripcion } from '../controllers/suscripciones.controller.js';

const router = Router();

router.post('/usuarios', verifyToken, create, createSuscripcion);

export default router;