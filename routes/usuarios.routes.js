import express from 'express';
import multer from 'multer';
import usuarioController from '../controllers/usuarios.controller.js';

const upload = multer()
const router = express.Router();

router.post('/usuarios',upload.none(), usuarioController.create);

export default router;