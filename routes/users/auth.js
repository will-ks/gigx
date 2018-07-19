'use strict';

// --- Dependencies --- //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const nodemailer = require('nodemailer');

const User = require('../../models/user');

// --- Config --- //
const saltRounds = 10;

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAILUSERNAME,
    pass: process.env.GMAILPASSWORD
  }
});

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
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check that a email and password have been provided
  if (!email || !password) {
    req.flash('error', 'Please provide an email and password');
    return res.redirect('/users/auth?mode=signup');
  }
  // Check that email is a valid email
  if (!validator.isEmail(email)) {
    req.flash('error', 'Please provide a valid email');
    return res.redirect('/users/auth?mode=signup');
  }

  // Check that password is strong
  const strongRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  if (!strongRegex.test(password)) {
    req.flash(
      'error',
      'Your password should be 6 characters or more, and include a mix of uppercase and lowercase characters, or numbers'
    );
    return res.redirect('/users/auth?mode=signup');
  }

  // Check if email already exists in database
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        req.flash('error', 'An account already exists with that email');
        return res.redirect('/users/auth?mode=signup');
      }

      // Create the user in the database
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashed = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email: email,
        password: hashed
      });

      transporter
        .sendMail({
          from: 'Gigx 👻 <gigxapp@gmail.com>',
          to: email,
          subject: 'Your Gigx account has been created',
          text:
            'Welcome to gigx! Everything is setup to view all the concerts from your favourite artists. Remember you can watch live concerts and previous ones. Also keep in mind you can upload your favourite classic concerts to our page. Take a look to our live concerts clicking here. Rock on!',
          html: `<h1>Welcome to Gigx</h1> <p>Everything is setup to view all the concerts from your favourite artists. Remember you can watch live concerts and previous ones. Also keep in mind you can upload your favourite classic concerts to our page.<p> <p>Take a look to our live concerts <a href='https://gig.herokuapp.com'>clicking here.<a> Rock on!<p>`
        })
        .then(info => console.log(info))
        .catch(error => console.log(error));
      return newUser.save().then(user => {
        req.session.currentUser = user;
        res.redirect('/listings');
      });
    })
    .catch(next);
});

// Login

router.post('/login', (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check that a email and password have been provided
  if (!email || !password) {
    req.flash('error', 'Please provide an email and password');
    return res.redirect('/users/auth?mode=login');
  }
  // Check that email is a valid email
  if (!validator.isEmail(email)) {
    req.flash('error', 'Please provide a valid email');
    return res.redirect('/users/auth?mode=login');
  }

  // Check if email already exists in database
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'No account found with that email');
        return res.redirect('/users/auth?mode=login');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('error', 'Please check your password');
        return res.redirect('/users/auth?mode=login');
      }
      req.session.currentUser = user;
      res.redirect('/listings');
    })
    .catch(next);
});

// Logout
router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
