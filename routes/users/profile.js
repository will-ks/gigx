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

module.exports = router;
