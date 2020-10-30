const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const router = express.Router();

router.post('/login', authLogic.googleLogin);

router.post('/logout', authLogic.logout);

router.get('/loginStatus',authLogic.verifyJwtToken,authLogic.loggedInUser,authLogic.loginStatus);
module.exports = router;
