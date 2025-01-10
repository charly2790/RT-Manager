import { Router } from "express";
import { getImage } from '../controllers/thirdPartyApi.controller.js';

const router = Router();

router.route('/randomImage')
    .get(getImage);

export default router;