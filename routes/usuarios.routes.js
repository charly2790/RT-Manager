import { Router } from 'express';
import multer from 'multer';
import { create,sayhello } from '../controllers/usuarios.controller.js';

const upload = multer()
const router = Router();

router.post('/usuarios',upload.none(), create);
router.get('/usuarios',upload.none(), sayhello);

export default router;