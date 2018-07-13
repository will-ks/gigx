'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../../models/user');

// --- Config --- //
const saltRounds = 10;

// --- Routes --- //
// Sign up
router.get('/', (req, res, next) => {
  // Check if user is already logged in
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const data = {
    messages: req.flash('error')
  };
  res.render('users/auth', data);
});

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check that a email and password have been provided
  if (!email || !password) {
    req.flash('error', 'Please provide an email and password');
    return res.redirect('/users/auth');
  }
  // Check that email is a valid email
  if (!validator.isEmail(email)) {
    req.flash('error', 'Please provide a valid email');
    return res.redirect('/users/auth');
  }

  // Check if email already exists in database
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        req.flash('error', 'An account already exists with that email');
        return res.redirect('/users/auth');
      }

      // Create the user in the database
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashed = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email: email,
        password: hashed
      });

      return newUser.save()
        .then(user => {
          req.session.currentUser = user;
          res.redirect('/list');
        });
    })
    .catch(next);
});

// Login

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check that a email and password have been provided
  if (!email || !password) {
    req.flash('error', 'Please provide an email and password');
    return res.redirect('/users/auth');
  }
  // Check that email is a valid email
  if (!validator.isEmail(email)) {
    req.flash('error', 'Please provide a valid email');
    return res.redirect('/users/auth');
  }

  // Check if email already exists in database
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'No account found with that email');
        return res.redirect('/users/auth');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('error', 'Please check your password');
        return res.redirect('/users/auth');
      }
      req.session.currentUser = user;
      res.redirect('/list');
    })
    .catch(next);
});

// Logout
router
  .post('/logout', (req, res, next) => {
    delete req.session.currentUser;
    res.redirect('/');
  });

module.exports = router;
