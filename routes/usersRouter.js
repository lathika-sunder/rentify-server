
const express = require('express');
const { addUser, getUsers,loginUser } = require('../controllers/usersController');
const router = express.Router();

router.post('/addUser',addUser)
router.get('/getUsers',getUsers)
router.post('/loginUser',loginUser)


module.exports=router