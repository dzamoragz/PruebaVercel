const express = require('express')
const router = express.Router();
const user2Controller = require('../controllers/user2')

router.post("/SumarValores", user2Controller.sumarValores)
      .post('/InsertUserVLA',user2Controller.insertUserVLA) 
      .post('/UpdateUserVLA',user2Controller.updateUserVLA)


module.exports = router;