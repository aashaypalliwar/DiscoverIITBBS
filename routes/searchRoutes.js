const express = require('express');
const searchController = require('./../controller/searchController')
const router = express.Router();


router
      .route('/:email')
      .get(searchController.searchUser);
module.exports = router;