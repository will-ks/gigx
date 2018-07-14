'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genres = ['Classical', 'Blues', 'Rock', 'Pop', 'Hip-hop', 'Reggae', 'Jazz', 'Country', 'World', 'Electronic', 'Metal', 'Indie', 'R&B', 'Latin'];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: genres,
    required: true
  },
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
