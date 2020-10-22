const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();

router.get('/profile', authLogic.protect, userController.aboutMe);
router.post('/googleLogin', authLogic.googleLogin);
router.get('/logout', authLogic.logout);
router.patch(
  '/update-profile',
  authLogic.protect,
  userController.updateProfile
);
router.get('/allUsers',authLogic.protect,userController.getAllUsers);
router.patch('/publish_to_false/:email',authLogic.protect,authLogic.restrictTo('admin'),userController.publishStatus_to_false);
module.exports = router;
