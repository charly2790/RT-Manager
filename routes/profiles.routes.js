import { Router } from "express";
import { create, update} from "../controllers/profiles.controller.js"
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { verifyPermisos } from "../middlewares/rbac.middleware.js";
import { upload } from '../middlewares/fileUpload.middleware.js'

const router = Router();

router.post('/profiles', verifyToken, verifyPermisos('PROFILE_CREATE'), upload.single('profileImage'),create);

export default router; 