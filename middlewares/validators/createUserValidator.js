const { body, validationResult } = require("express-validator");
const handleValidationErrors = require("../handleValidationErrors")

const validateCreateUser = [
    body("username")
        .exists().withMessage("El username es obligatorio")
        .isString().withMessage("El username debe ser un texto")
        .isLength({ min: 3 }).withMessage("El username debe tener al menos 3 caracteres"),

    body("password")
        .exists().withMessage("El password es obligatorio")
        .isString().withMessage("El password debe ser un texto")
        .isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),

    handleValidationErrors    
];

module.exports = { validateCreateUser };