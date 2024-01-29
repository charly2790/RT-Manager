import { Router } from 'express';
import multer from 'multer';
import { create } from '../controllers/usuarios.controller.js';

const upload = multer()
const router = Router();

router.post('/usuarios',upload.none(), create);

export default router;