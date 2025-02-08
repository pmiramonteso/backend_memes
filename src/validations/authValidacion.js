import { body } from 'express-validator';

export const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Proporcione un correo válido"),
    body("password")
        .exists()
        .withMessage("La contraseña es obligatoria")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
];

export const registroValidator = [
    body("nombre")
        .exists()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto")
        .isLength({ max: 30 })
        .withMessage("El nombre debe tener máximo 30 caracteres"),

    body("apellidos")
        .optional()
        .isString()
        .withMessage("El apellido debe ser una cadena de texto")
        .isLength({ max: 30 })
        .withMessage("El apellido debe tener máximo 30 caracteres"),

    body("email")
        .isEmail()
        .withMessage("El correo debe tener un formato válido"),

    body("password")
        .exists()
        .withMessage("La contraseña es obligatoria")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
];

export const forgotPasswordValidator = [
    body("email")
        .isEmail()
        .withMessage("Proporcione un correo válido")
];

export const changePasswordValidator = [
    body("token")
        .exists()
        .withMessage("El token es obligatorio"),
    body("password")
        .exists()
        .withMessage("La contraseña es obligatoria")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
];


