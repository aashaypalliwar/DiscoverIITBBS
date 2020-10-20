const express = require('express');
const searchController = require('./../controller/searchController');
const router = express.Router();

router.route('/:email').get(searchController.searchUser);

console.log('Check');

module.exports = router;
