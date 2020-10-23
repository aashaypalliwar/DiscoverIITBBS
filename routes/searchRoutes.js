const express = require('express');
const searchController = require('./../controller/searchController');
const authLogic = require('./../model/businessLogic/authLogic')
const router = express.Router();

router.route('/:email').get(authLogic.verifyJwtToken,authLogic.loggedInUser , searchController.searchUser);

console.log('Check');

module.exports = router;
