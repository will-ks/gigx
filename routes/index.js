'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/listings');
  }
  res.render('index', { title: 'Gigx - The home of online concerts' });
});

module.exports = router;
