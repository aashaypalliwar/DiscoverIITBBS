const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const userController = require('./../controller/userController');
const adminController = require('./../controller/adminController');
const { auth } = require('google-auth-library');
const router = express.Router();

router.use(authLogic.verifyJwtToken);
router.patch(
  '/unpublish',
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.unpublish
);
router.patch(
  '/publish',
  authLogic.restrictTo('superAdmin'),
  authLogic.loggedInUser,
  adminController.publish
);
router.patch(
  '/verify',
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.verify
);
router.patch(
  '/unverify',
  authLogic.restrictTo('admin', 'superAdmin'),
  authLogic.loggedInUser,
  adminController.unverify
);
router.patch(
    '/autoVerify',
    authLogic.restrictTo('superAdmin'),
    authLogic.loggedInUser,
    adminController.autoVerify
  );
router.post(
    '/tag',
    authLogic.restrictTo( 'superAdmin'),
    authLogic.loggedInUser,
    adminController.createTag
)

router.delete(
    '/tag/:id',
    authLogic.restrictTo( 'superAdmin'),
    authLogic.loggedInUser,
    adminController.deleteTag
)
router.get(
  '/unpublished',
    authLogic.restrictTo( 'superAdmin'),
    authLogic.loggedInUser,
    adminController.getAllUnpublishedUsers
)

module.exports = router;
