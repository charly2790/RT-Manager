import { Router } from "express";
import { 
    create, 
    getById,
    updateStatus 
} from "../controllers/sesionesEntrenamiento.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { verifyPermisos } from "../middlewares/rbac.middleware.js";

const router = Router();

router.post('/sesionesEntrenamiento',verifyToken,verifyPermisos('SESION-ENTRENAMIENTO_CREATE'), create)
router.get('/sesionesEntrenamiento',verifyToken,verifyPermisos('SESION-ENTRENAMIENTO_READ'), getById);
router.patch('/sesionesEntrenamiento/updateStatus', verifyToken, verifyPermisos('SESION-ENTRENAMIENTO_READ'), updateStatus);


export default router;