'use strict';

// --- Dependencies ---//
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');

// --- Instantiations ---//
const app = express();

// --- Configurations ---//
// Database
const dbName = 'gigx';
mongoose.connect(`mongodb://localhost/${dbName}`);
// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Use partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// --- Middleware ---//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---//
app.use('/', index);
app.use('/users', users);

// -- 404 and error handler
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
