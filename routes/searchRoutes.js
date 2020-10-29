const express = require('express');
const searchController = require('./../controller/searchController');
const authLogic = require('./../model/businessLogic/authLogic');
const router = express.Router();

router
  .route('/user/:query')
  .get(authLogic.verifyJwtToken, searchController.searchUser);

router
  .route('/tags')
  .post( authLogic.verifyJwtToken,searchController.searchByTag);

module.exports = router;
