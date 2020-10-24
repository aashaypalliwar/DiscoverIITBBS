const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();

router.get(
  '/profile',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.aboutMe
);
router.patch(
  '/profile',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.updateProfile
);
router.get(
  '/allUsers',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.getAllUsers
);

module.exports = router;
