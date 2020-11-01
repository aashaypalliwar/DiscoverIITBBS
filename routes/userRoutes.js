const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();

router.use(authLogic.verifyJwtToken);

router.get('/', userController.getAllUsers);

//Own profile
router.get(
  '/profile',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.aboutMe
);

//Other's profile
router.get(
  '/other',
  authLogic.restrictTo('visitor', 'user', 'admin', 'superAdmin'),
  userController.getProfile
);

router.patch(
  '/profile',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.updateProfile
);

router.get(
  '/tag',
  authLogic.restrictTo('visitor', 'user', 'admin', 'superAdmin'),
  userController.getAllTags
);

router.patch(
  '/report/:id',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.reportUser
);

module.exports = router;
