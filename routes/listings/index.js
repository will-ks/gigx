'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();
const validator = require('validator');

const Listing = require('../../models/listing');

// --- Routes --- //
router.get('/', (req, res, next) => {
  const data = {
    messages: req.flash('error')
  };
  res.render('listings', data);
});

router.get('/view/:id', (req, res, next) => {
  const listingId = req.params.id;
  // TODO: Check that id is valid ObjectID, redirect if not
  Listing.findById(listingId)
    .then(listing => {
      if (!listing) {
        req.flash('error', 'Invalid listing id');
        res.redirect('/listings');
      }
      res.render('listings/view', listing);
    })
    .catch(next);
});

router.get('/add', (req, res, next) => {
  res.render('listings/add');
});

router.post('/add', (req, res, next) => {
  const { title, videoUrl, imageUrl, artist, year, duration, location, genre } = req.body;

  const data = { title, videoUrl, imageUrl, artist, year, duration, location, genre };

  const today = new Date();

  if (!title || !videoUrl || !artist || !genre) {
    req.flash('error', 'Please fill out all required fields');
    return res.redirect('/listings/add');
  }

  if (!validator.isURL(videoUrl)) {
    req.flash('error', 'Please check the video URL');
    return res.redirect('/listings/add');
  }

  if (imageUrl && !validator.isURL(imageUrl)) {
    req.flash('error', 'Please check the image URL');
    return res.redirect('/listings/add');
  }

  if (year && (year < 1900 || year > today.getFullYear())) {
    req.flash('error', 'Please check the year');
    return res.redirect('/listings/add');
  }

  const newListing = new Listing(data);
  newListing.save()
    .then(listing => {
      res.redirect('/listings/view/' + listing._id);
    })
    .catch(next);
});

module.exports = router;
