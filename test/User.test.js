const { use } = require('react')
const {Login} = require('../controllers/user')
const userDAL = require('../dataAccess/user')
const Response = require('../models/StaticResponse')
const HttpStatus = require("../utils/HttpStatus")
const {UserResponseCodes, UserReponseMessages} = require('../utils/ResponseEnums')
jest.mock("../dataAccess/user");
describe('Login', ()=>{
    test('Debe responder 401 si la contrasena es incorrecta', async()=>{
        const req = {
            body: {username:'johel', password:'123456789'}
        };
        const res = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        userDAL.existUserInDataBase.mockResolvedValue(true);
        userDAL.getStateByUserName.mockResolvedValue({
            username: 'johel',
            password: '1234Ab',
            state: true
        });

        await Login (req, res);

        expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
        expect(res.send).toHaveBeenCalledWith({
            statusCode:401,
            codeResponse : UserResponseCodes.INVALID_PASSWORD,
            descriptionMessage: UserReponseMessages.INVALID_PASSWORD,
            data: null
        });
    })
})