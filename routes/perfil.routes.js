import { create, update, testUpload } from "../controllers/perfil.controller.js"
import { Router } from "express";
import { upload } from '../middlewares/fileUpload.middleware.js'
import { validationRules } from "../rules/perfil.rules.js";
import { verifyPermisos } from "../middlewares/rbac.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { ORIGINS } from "../middlewares/types/types.js";

const router = Router();

router.post('/perfiles', verifyToken, verifyPermisos('PROFILE_CREATE'), upload(ORIGINS.PROFILE).single('profileImage'), validationRules, create);
router.patch('/perfiles/:id', verifyToken, verifyPermisos('PROFILE_CREATE'), upload(ORIGINS.PROFILE).single('profileImage'), update);
router.post('/testUpload', upload(ORIGINS.PROFILE).single('profileImage'), testUpload);

export default router; 