const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require ('../middleware/auth');
router.post('/register', userController.register);
router.post('/refresh_token', userController.refreshtoken);
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/infor', auth ,userController.getUser)
module.exports=router ;