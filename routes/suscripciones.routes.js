import { createSuscripcion,getSuscripciones } from "../controllers/suscripciones.controller.js";
import { Router } from "express";

const router = Router();

router.route('/suscripciones')
    .post(createSuscripcion)
    .get(getSuscripciones)


export default router;