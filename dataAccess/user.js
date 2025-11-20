const {PrismaClient} = require("../generated/prisma")
const prisma = new PrismaClient();

async function getStateByUserName(username){
    const user = await prisma.user.findFirst({
        where: { username }
        });

    return user;
}

async function existUserInDataBase(username){
    const user = await prisma.user.findFirst({
        where: { username }, 
        select : {id:true}
        });

    return !!user;
}

async function createUser(username, password, state = true)
{
    return await prisma.user.create({
        data:{
            username, 
            password, 
            state
        }
    })
}

async function deleteUser(username)
{
    return await prisma.user.delete({
        where:{
            username : username
        }
    })
}

async function updateUserByUserName(username, data) 
{
    return await prisma.user.update({
        where : {username},
        data        
    })    
}


module.exports = {
    getStateByUserName, 
    existUserInDataBase, 
    createUser, 
    deleteUser, 
    updateUserByUserName
}