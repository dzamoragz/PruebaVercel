const user2Dal = require('../dataAccess/user2');

async function sumarValores(req, res){
    const {valor1, valor2} = req.body; 

    console.log(valor1,valor2)

    const resultado = await user2Dal.sumarValores(valor1, valor2);

    console.log(resultado)

    res.send({resultado})
}

async function insertUserVLA(req,res) {
    const {username, password, state} =req.body;
    const resultado = await user2Dal.insertUserVLA(username,password,state)
    
    res.send(resultado)
}

async function updateUserVLA(req,res) { 
    const {userId, password, state} =req.body;
    const resultado = await user2Dal.updateUserVLA(userId,password,state)
    
    res.send(resultado)
}

async function existUser(req,res) { 
    const {username} =req.body;
    const resultado = await user2Dal.existUser(username)
    res.send(resultado)
}


module.exports = 
{
    sumarValores,
    insertUserVLA,
    updateUserVLA,
    existUser
};