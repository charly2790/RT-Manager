import { Router } from "express";
import { create } from "../controllers/sesionesEntrenamiento.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { verifyPermisos } from "../middlewares/rbac.middleware.js";

const router = Router();

router.post('/sesionesEntrenamiento',verifyToken,verifyPermisos('SESION-ENTRENAMIENTO_CREATE'), create);

export default router;