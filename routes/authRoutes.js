const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();

router.post('/googleLogin', authLogic.googleLogin);

router.get('/logout', authLogic.logout);

module.exports = router;