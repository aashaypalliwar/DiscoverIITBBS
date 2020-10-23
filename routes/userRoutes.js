const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();


router.post('/googleLogin', authLogic.googleLogin);
router.get('/logout', authLogic.logout);
router.get('/profile', authLogic.verifyJwtToken,authLogic.loggedInUser, userController.aboutMe);
router.patch(
  '/update-profile',
  authLogic.verifyJwtToken,authLogic.loggedInUser,
  userController.updateProfile
);
router.get('/allUsers',authLogic.verifyJwtToken,authLogic.loggedInUser,userController.getAllUsers);
router.patch('/publish_to_false/:email',authLogic.verifyJwtToken,authLogic.loggedInUser,authLogic.restrictTo('admin'),userController.publishStatus_to_false);
module.exports = router;
