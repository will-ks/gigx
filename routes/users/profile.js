'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();

const User = require('../../models/user');

const isValidObjectId = require('../../middlewares/isValidObjectId');

// --- Routes --- //

// Add star
router.post('/stars/add/:id', isValidObjectId, (req, res, next) => {
  const listingId = req.params.id;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId, { $addToSet: { stars: listingId } }, { new: true })
    .then(user => {
      req.session.currentUser = user;
      // TODO: Fix this
      return res.redirect(req.headers.referer);
    })
    .catch(next);
});

// Remove star
router.post('/stars/remove/:id', isValidObjectId, (req, res, next) => {
  const listingId = req.params.id;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId, { $pull: { stars: listingId } }, { new: true })
    .then(user => {
      req.session.currentUser = user;
      return res.redirect(req.headers.referer);
    })
    .catch(next);
});

// Show stars
router.get('/stars', (req, res, next) => {
  const data = {
    messages: req.flash('error'),
    sections: []
  };
  User.findById(req.session.currentUser._id)
    .populate('stars')
    .then(result => {
      console.log(result);
      data.sections.push({ title: `My favourites`, listings: result.stars });
      res.render('listings', data);
    })
    .catch(next);
});

module.exports = router;
