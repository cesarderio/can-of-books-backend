'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./Book.js');

async function seed() {
  // **name: {type: String, required: true},
  // **color: {type: String, required: true},
  // **spayNeuter: {type: Boolean, required: true},
  // **location: {type: String, required: true}
  console.log('Ray the cat was created');

  await Book.create({
    title: 'Pat the cat',
    description: 'Pat the cat is not a rat',
    status: 'available'
  });

  console.log('Pat the cat was created');

  await Book.create({
    title: 'Charles the cat',
    description: 'Charles the cat',
    status: 'available'
  });

  console.log('Charles the cat was created');

  await Book.create({
    title: 'Ray the cat',
    description: 'Ray the cat',
    status: 'not available'
  });


  mongoose.disconnect();
};

seed();
