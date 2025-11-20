const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_super_secreta";

function generarToken(usuario){
    return jwt.sign(
        {
            username: usuario.username
        },
        SECRET_KEY, 
        {expiresIn:'60s'}
    )
}

function verificarToken(token){
    try{
        return jwt.verify(token,SECRET_KEY)
    }catch(err)
    {
        return null    
    }
}

module.exports={generarToken,verificarToken}