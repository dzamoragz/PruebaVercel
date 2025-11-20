const { body, validationResult } = require("express-validator");
const handleValidationErrors = require("../handleValidationErrors")

const validateDeleteUser = [
    body("username")
        .exists().withMessage("El username es obligatorio para eliminar"),

    handleValidationErrors
];

module.exports = { validateDeleteUser };