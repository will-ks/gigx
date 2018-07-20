'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genres = [
  'Classical',
  'Blues',
  'Rock',
  'Pop',
  'Hip-hop',
  'Reggae',
  'Jazz',
  'Country',
  'World',
  'Electronic',
  'Metal',
  'Indie',
  'R&B',
  'Latin'
];

const sources = ['Youtube', 'HLS', 'RTMP'];

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
    type: String,
    default: '/images/concert-default.jpeg'
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
  },
  live: {
    type: Boolean
  },
  dateTime: {
    type: Date
  },
  source: {
    type: String,
    enum: sources,
    default: 'Youtube'
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
