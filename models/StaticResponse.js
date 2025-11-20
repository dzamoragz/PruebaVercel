const HttpStatus = require("../utils/HttpStatus")

class StaticResponse 
{
    static success(statusCode =HttpStatus.OK , descriptionMessage = "Transaccion correcta", data = null)
    {
        return {
            statusCode: statusCode, 
            codeResponse : 0, 
            descriptionMessage, 
            data
        }
    }

    static error(statusCode=HttpStatus.BAD_REQUEST,codeResponse =1,descriptionMessage = "Error", data = null)
    {
        return {
            statusCode,
            codeResponse, 
            descriptionMessage, 
            data
        }
    }
}

module.exports = StaticResponse;