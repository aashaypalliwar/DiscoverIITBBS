const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const router = express.Router();


router.use(authLogic.verifyJwtToken);
router.get(
  '/',
  userController.getAllUsers
);
router.get(
  '/profile',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.aboutMe
);
router.patch(
  '/profile',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.updateProfile
);

router.get(
  '/tag',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.getAllTags
);
router.patch(
  '/report/:id',
  authLogic.restrictTo('user', 'admin', 'superAdmin'),
  authLogic.loggedInUser,
  userController.reportUser
)
module.exports = router;
