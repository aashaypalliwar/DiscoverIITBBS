const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const adminController = require('./../controller/adminController');
const router = express.Router();


router.patch('/unpublish',authLogic.verifyJwtToken,authLogic.restrictTo('admin','superAdmin'),authLogic.loggedInUser,adminController.depublish);

module.exports = router;
