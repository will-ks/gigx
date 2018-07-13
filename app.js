'use strict';

// --- Dependencies --- //
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const index = require('./routes/index');
const auth = require('./routes/users/auth');
const list = require('./routes/listings/list');

// --- Instantiations --- //
const app = express();

// --- Configurations --- //
// -- Database
const dbName = 'gigx';
mongoose.connect(`mongodb://localhost/${dbName}`);
// -- View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Use partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// -- Logging
const logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// --- Middleware --- //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('combined', { stream: accessLogStream }));
app.use(session({
  secret: 'gigx',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
app.use(flash());

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// --- Routes --- //
app.use('/', index);
app.use('/users/auth', auth);
app.use('/listings/list', list);

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
