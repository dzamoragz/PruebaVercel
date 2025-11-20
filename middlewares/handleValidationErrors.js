const { validationResult } = require("express-validator");
const Response = require("../models/StaticResponse");
const HttpStatus = require("../utils/HttpStatus");
const { UserResponseCodes } = require("../utils/ResponseEnums");

function handleValidationErrors(req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formatted = errors.array({ onlyFirstError: true }).map(e => ({
            field: e.path,
            message: e.msg
        }));

        const messages = formatted.map(e => e.message).join(", ");

        const response = Response.error(
            HttpStatus.BAD_REQUEST,
            UserResponseCodes?.INVALID_INPUT || 1,
            messages,
            formatted
        );

        return res.status(response.statusCode).send(response);
    }
    next();
}

module.exports = handleValidationErrors;
