import { Router } from "express";
import { create, getById } from "../controllers/sesionesEntrenamiento.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { verifyPermisos } from "../middlewares/rbac.middleware.js";

const router = Router();

router.post('/sesionesEntrenamiento',verifyToken,verifyPermisos('SESION-ENTRENAMIENTO_CREATE'), create);
router.get('/sesionesEntrenamiento',verifyToken,verifyPermisos('SESION-ENTRENAMIENTO_READ'), getById)

export default router;