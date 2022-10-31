'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./Models/Book')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

const { request, response } = require('express');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find({});
    response.status(200).send(results);
  } catch (error) {
    next(error)
  }
}

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.use((error, request, response, next) => {
  response.status(404).send('Not available');
})


app.listen(PORT, () => console.log(`listening on ${PORT}`));

