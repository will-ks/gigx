'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();

const Listing = require('../../models/listing');

// --- Routes --- //
router.get('/', (req, res, next) => {
  res.render('listings');
});

router.get('/view/:id', (req, res, next) => {
  const listingId = req.params.id;
  // TODO: Check that id is valid ObjectID, redirect if not
  Listing.findById(listingId)
    .then(listing => {
      if (!listing) {
        res.redirect('/listings');
      }
      res.render('listings/view', listing);
    })
    .catch(next);
});

module.exports = router;
