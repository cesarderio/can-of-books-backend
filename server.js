'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./Models/Book')

const app = express();
app.use(cors());
app.use(express.json());

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

//---------- ENDPOINT - TO UPDATE A BOOK----------------
//----------- ADDED 11/02/22-----------------
app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next){
  try {
    let id = request.params.bookID;
    let data = request.body;

//-- findByIdAndUpdate - 3 arguments
// 1. id of the thing to update
// 2. updated data
// 3. option object - { new: true, overwrite: true }

const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true});

response.status(200).send(updatedBook);

  } catch (error) {
    next(error);
  }
}


//-----------------------------------------------------
app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    const results = await Book.find();
    response.status(200).send(results);
    console.log(results);
  } catch (error) {
    next(error)
  }
}

app.post('/books', postBooks);

async function postBooks(request, response, next){
  try {
    console.log(request.body);
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
    
  }
}

app.delete('/books/:bookID', deleteBooks);

async function deleteBooks(request, response, next){
  console.log(request.params);
  console.log(request.params.bookID);
  try {
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book was deleted');
  } catch (error) {
    next(error);
  }
}




app.get('/test', (request, response) => {
  response.send('test request received')
})

app.use((error, request, response, next) => {
  response.status(404).send('Not available');
})


app.listen(PORT, () => console.log(`listening on ${PORT}`));

