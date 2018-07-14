'use strict';

function requireLoggedInUser (req, res, next) {
  if (!req.session.currentUser) {
    return res.redirect('/users/auth?mode=login');
  }
  next();
}

module.exports = requireLoggedInUser;
