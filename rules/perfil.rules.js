import { body } from "express-validator";

export const validationRules = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser un texto'),
    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser un texto'),
    body('apodo')
        .optional()
        .isString().withMessage('El apellido debe ser un texto'),
    body('genero')
        .notEmpty().withMessage('El genero es obligatorio')
        .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El genero debe ser Masculino, Femenino o Otro'),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha de nacimiento debe ser una fecha'),
    body('Facebook')
        .optional()
        .isString().withMessage('El Facebook debe ser un texto'),
    body('Instagram')
        .optional()
        .isString().withMessage('El Instagram debe ser un texto'),
    body('X')
        .optional()
        .isString().withMessage('El X debe ser un texto'),
];