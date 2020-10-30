const express = require('express');
const authLogic = require('./../model/businessLogic/authLogic');
const adminController = require('./../controller/adminController');
const router = express.Router();

router.use(authLogic.verifyJwtToken);
router.patch(
  '/unpublish',
  authLogic.restrictTo('admin', 'superAdmin'),
  adminController.unpublish
);
router.patch(
  '/publish',
  authLogic.restrictTo('superAdmin'),
  adminController.publish
);
router.patch(
  '/verify',
  authLogic.restrictTo('admin', 'superAdmin'),
  adminController.verify
);
router.patch(
  '/unverify',
  authLogic.restrictTo('admin', 'superAdmin'),
  adminController.unverify
);
router.patch(
  '/autoVerify',
  authLogic.restrictTo('superAdmin'),
  adminController.autoVerify
);
router.post(
  '/tag',
  authLogic.restrictTo('superAdmin'),
  adminController.createTag
);

router.delete(
  '/tag/:id',
  authLogic.restrictTo('superAdmin'),
  adminController.deleteTag
);

router.patch(
  '/tag/:id',
  authLogic.restrictTo('superAdmin'),
  adminController.updateTag
);

router.get(
  '/unpublished',
  authLogic.restrictTo('superAdmin'),
  adminController.getAllUnpublishedUsers
);

router.get(
  '/reported',
  authLogic.restrictTo('superAdmin'),
  adminController.getAllReportedUsers
);

module.exports = router;