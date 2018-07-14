'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();

// const Listing = require('../../models/listingModel');

// --- Routes --- //
router.get('/', (req, res, next) => {
  res.render('listings/');
});

module.exports = router;
