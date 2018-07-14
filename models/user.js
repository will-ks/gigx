'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/images/avatar.svg'
  },
  stars: [{
    type: Schema.Types.ObjectId
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
