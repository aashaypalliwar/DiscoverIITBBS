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
  '/',
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.getAllUsers
);
router.get(
  '/tag',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.getAllTags
);
module.exports = router;
