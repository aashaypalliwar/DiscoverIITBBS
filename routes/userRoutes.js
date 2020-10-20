const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic')

const router = express.Router();


router.post('/googleLogin',authLogic.googleLogin)

module.exports = router;