const { verificarToken } = require("../utils/jwt");
const Response = require("../models/StaticResponse")
const HttpStatus = require("../utils/HttpStatus")
const {UserResponseMessages, UserResponseCodes} = require("../utils/ResponseEnums");
const { decode } = require("jsonwebtoken");

function authMiddleware(req, res, next){
     const authHeader = req.headers['authorization'];

     if(!authHeader){
        const response = Response.error(
            HttpStatus.UNAUTHORIZED,
            UserResponseCodes.UNAUTHORIZED, 
            UserResponseMessages.REQUIRE_TOKEN
        )

        return res.status(response.statusCode).send(response)
     }


     const token = authHeader.split(' ')[1];

     console.log("El token es:", token)

     try
     {
        const decoded = verificarToken(token);
        
        //Guardamos la info del usuario en el request
        req.user = decoded;
        next();
     }
     catch(error)
     {
        //Si el error es por expiracion
        if(error.name = "TokenExpiredError"){
            const response = Response.error(
                HttpStatus.UNAUTHORIZED,
                UserResponseCodes.UNAUTHORIZED,
                UserResponseMessages.EXPIRED_TOKEN
            )

            return res.status(response.statusCode).send(response)
        }

        if(error.name = "JsonWebTokenError"){
             const response = Response.error(
                HttpStatus.UNAUTHORIZED,
                UserResponseCodes.UNAUTHORIZED,
                UserResponseMessages.INVALID_TOKEN
            )

            return res.status(response.statusCode).send(response)
        }

        const response = Response.error(
                HttpStatus.UNAUTHORIZED,
                UserResponseCodes.UNAUTHORIZED,
                "Error al validar el token")
        return res.status(response.statusCode).send(response)
     }
    

}

module.exports = authMiddleware;