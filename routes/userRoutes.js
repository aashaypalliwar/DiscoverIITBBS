const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic')
const userController = require('./../controller/userController')
const router = express.Router();

router.get('/profile',authLogic.protect,userController.aboutMe);
router.post('/googleLogin',authLogic.googleLogin)

module.exports = router;