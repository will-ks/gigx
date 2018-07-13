// --- Dependencies --- //
import isEmail from 'validator/lib/isEmail';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/user');

// --- Config --- //
const saltRounds = 10;

// --- Routes --- //
// Sign up
router.get('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // Check if user is already logged in
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  // Check that a email and password have been provided
  if (!email || !password) {
    // Flash an error
    return res.redirect('/signup');
  }
  // Check that email is a valid email
  if (!isEmail(email)) {
    // Flash an error
    return res.redirect('/signup');
  }

  // Check if email already exists in database
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        // Flash an error
        return res.redirect('/signup');
      }

      // Create the user in the database
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashed = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email: email,
        password: hashed
      });

      newUser.save()
        .then(user => {

          res.redirect('/list');
        }
    })
    .catch(next);
});

module.exports = router;
