const userDAL = require("../dataAccess/user")
const Response = require("../models/StaticResponse")
const {UserResponseCodes, 
      UserResponseMessages} = require("../utils/ResponseEnums")
const HttpStatus = require("../utils/HttpStatus")
const {GenerarToken, generarToken} = require("../utils/jwt")

async function Login(req,res)
{
    const {username, password} = req.body
    const existUser = await userDAL.existUserInDataBase(username);
   

    //Validar si existe el usuario en nuestra base de datos
    if(existUser)
    {
        const findUser = await userDAL.getStateByUserName(username);
        
        if(findUser.state)
        {          
            console.log(findUser.password, )  
            if(password == findUser.password){
                const token = generarToken(findUser)

                const response = Response.success(HttpStatus.OK,UserResponseMessages.SUCCESS,{
                    username: findUser.username,
                    token
                })
                return res.status(response.statusCode).send(response)
            }   
            else
            {
                const response = Response.error(HttpStatus.UNAUTHORIZED,
                                                UserResponseCodes.INVALID_PASSWORD, 
                                                UserResponseMessages.INVALID_PASSWORD)
                return res.status(response.statusCode).send(response)
            }             
        }
        else 
        {
            const response = Response.error(HttpStatus.FORBIDDEN,
                                            UserResponseCodes.USER_BLOCKED,
                                            UserResponseMessages.USER_BLOCKED)
            return res.status(response.statusCode).send(response)
        }
    }
    else
    {
        const response = Response.error(HttpStatus.NOT_FOUND,
                                        UserResponseCodes.USER_NOT_FOUND,
                                        UserResponseMessages.USER_NOT_FOUND)
        return res.status(response.statusCode).send(response)
    }
}

/*
    Preguntar si existe o no el usuario
    Si existe, mostrar un error
    Si no existe, crearlo y decirle que lo creol
*/
async function CreateUser(req, res)
{
    const {username, password} = req.body;

    const existUser = await userDAL.existUserInDataBase(username);

    if(existUser)
    {
        const response = Response.error(HttpStatus.CONFLICT,
                                                UserResponseCodes.USER_EXIST, 
                                                UserResponseMessages.USER_EXIST)
        return res.status(response.statusCode).send(response)
    }
    else
    {
        const newUser = await userDAL.createUser(username, password, true);
        const response = Response.success(HttpStatus.OK,UserResponseMessages.SUCCESS,{username: newUser.username})
        console.log(newUser);
        return res.status(response.statusCode).send(response)
    }    
}


async function DeleteUser(req, res)
{
    const {username} = req.body;

    const existUser = await userDAL.existUserInDataBase(username);

    if(existUser)
    {
        await userDAL.deleteUser(username);
        const response = Response.success(HttpStatus.NO_CONTENT,UserResponseMessages.USER_DELETED, {username: username})
        return res.status(response.statusCode).send(response)
    }
    else
    {
        const response = Response.error(HttpStatus.NOT_FOUND,
                                        UserResponseCodes.USER_NOT_FOUND,
                                        UserResponseMessages.USER_NOT_FOUND)
        return res.status(response.statusCode).send(response)
    }    
}

async function UpdateUserByUserName(req, res) 
{
    const {username, password, state} = req.body;
    const existUser = await userDAL.existUserInDataBase(username);

    if(existUser)
    {        
        const updateData = {
            password : password,
            state : state
        }
        await userDAL.updateUserByUserName(username, updateData);
        const response = Response.success(HttpStatus.OK,UserResponseMessages.USER_UPDATED, {username: username})
        return res.status(response.statusCode).send(response)
    }
    else
    {
        const response = Response.error(HttpStatus.NOT_FOUND,
                                        UserResponseCodes.USER_NOT_FOUND,
                                        UserResponseMessages.USER_NOT_FOUND)
        return res.status(response.statusCode).send(response)
    }    
}

module.exports = {
    Login, 
    CreateUser,
    DeleteUser, 
    UpdateUserByUserName
}
