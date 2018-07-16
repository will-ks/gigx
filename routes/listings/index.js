'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();
const validator = require('validator');

const Listing = require('../../models/listing');
const requireLoggedInUser = require('../../middlewares/requireLoggedInUser');
const isValidObjectId = require('../../middlewares/isValidObjectId');

// --- Routes --- //
// Listings
router.get('/', requireLoggedInUser, (req, res, next) => {
  const data = {
    messages: req.flash('error'),
    sections: []
  };
  Listing.find()
    .then(listings => {
      // Put each listing into the data.sections array, in objects separated by genre
      listings.forEach(listing => {
        const objectIndex = data.sections.findIndex(element => {
          return element.title === listing.genre;
        });

        if (objectIndex > -1) {
          data.sections[objectIndex].listings.push(listing);
        } else {
          data.sections.push({ title: listing.genre, listings: [listing] });
        }
      });
      res.render('listings', data);
    })
    .catch(next);
});

// View listing
router.get('/view/:id', requireLoggedInUser, isValidObjectId, (req, res, next) => {
  const listingId = req.params.id;
  Listing.findById(listingId)
    .then(listing => {
      if (!listing) {
        res.status(404);
        return res.render('not-found');
      }
      res.render('listings/view', listing);
    })
    .catch(next);
});

// Add listing
router.get('/add', requireLoggedInUser, (req, res, next) => {
  res.render('listings/add');
});

router.post('/add', requireLoggedInUser, (req, res, next) => {
  const { title, videoUrl, imageUrl, artist, year, duration, location, genre } = req.body;

  const data = { title, videoUrl, imageUrl, artist, year, duration, location, genre };

  const today = new Date();

  // Check all required parameters have been supplied
  if (!title || !videoUrl || !artist || !genre) {
    req.flash('error', 'Please fill out all required fields');
    return res.redirect('/listings/add');
  }

  // Check video URL is valid
  if (!validator.isURL(videoUrl)) {
    req.flash('error', 'Please check the video URL');
    return res.redirect('/listings/add');
  }

  // Check image URL is valid
  if (imageUrl && !validator.isURL(imageUrl)) {
    req.flash('error', 'Please check the image URL');
    return res.redirect('/listings/add');
  }

  // Check year is valid
  if (year && (year < 1900 || year > today.getFullYear())) {
    req.flash('error', 'Please check the year');
    return res.redirect('/listings/add');
  }

  // Check if video already exists
  Listing.find({ videoUrl: videoUrl })
    .then(listing => {
      if (listing) {
        req.flash('error', 'We already have that video in our database');
        return res.redirect('/listings/add');
      }
    })
    .catch(next);

  // Create listing
  const newListing = new Listing(data);
  newListing.save()
    .then(listing => {
      res.redirect('/listings/view/' + listing._id);
    })
    .catch(next);
});

module.exports = router;
