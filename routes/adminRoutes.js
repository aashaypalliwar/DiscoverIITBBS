const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const adminController = require('./../controller/adminController');
const router = express.Router();

router.patch(
  '/unpublish',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.unpublish
);
router.patch(
  '/publish',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('superAdmin'),
  authLogic.loggedInUser,
  adminController.publish
);
router.patch(
  '/verify',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.verify
);
router.patch(
  '/unverify',
  authLogic.verifyJwtToken,
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.unverify
);
module.exports = router;
