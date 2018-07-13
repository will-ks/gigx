'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genres = ['Classical', 'Blues', 'Rock', 'Pop', 'Hip-hop', 'Reggae', 'Jazz', 'Country', 'World', 'Electronic', 'Metal', 'Indie', 'R&B', 'Latin'];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  artist: {
    type: String,
    required: true
  },
  genres: [{
    type: String,
    enum: genres
  }],
  year: {
    type: Number
  },
  duration: {
    type: Number
  },
  location: {
    type: String
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
