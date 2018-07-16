const mongoose = require('mongoose');
const Listing = require('../models/listing');

const dbName = 'gigx';
mongoose.connect(`mongodb://localhost/${dbName}`);

const listings = [
  {
    title: 'Coachella',
    artist: 'Radiohead',
    year: 2017,
    genre: 'Rock',
    videoUrl: 'https://www.youtube.com/watch?v=b_q_WSM3Hok',
    imageUrl: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/04/2017GettyImages-radiohead-coachella-technical-difficulties-920x584.jpg',
    duration: 90
  },
  {
    title: 'Live at Sydney Opera House',
    artist: 'The National',
    year: 2017,
    genre: 'Rock',
    videoUrl: 'https://www.youtube.com/watch?v=uWd0EWKpH94',
    imageUrl: 'https://www.goldenplec.com/wp-content/uploads/2014/07/6B5A9976bw_cov.jpg',
    duration: 95,
    location: 'Sydney'
  },
  {
    title: 'Panorama',
    artist: 'Nine Inch Nails',
    year: 2017,
    genre: 'Metal',
    videoUrl: 'https://www.youtube.com/watch?v=sSVOgQKiYQ4',
    imageUrl: 'https://i.ytimg.com/vi/vVnzg97NVTg/maxresdefault.jpg',
    duration: 96,
    location: 'New York'
  },
  {
    title: 'Live in Glastonbury',
    artist: 'Portishead',
    year: 2013,
    genre: 'Electronic',
    videoUrl: 'https://www.youtube.com/watch?v=KgzcFZhLxXo',
    imageUrl: 'https://thewestreviewdotcom.files.wordpress.com/2015/07/latitude15_marc-sethi_dsc_6559.jpg',
    duration: 71,
    location: 'UK'
  }
];

Listing.create(listings)
  .then(() => {
    console.log('Success');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
