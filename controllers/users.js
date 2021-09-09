//import express and instantiate express router
const express = require('express');
const router = express.Router();

// import the User model
const User = require('../models/user-model');

// Index: GET all the Users
router.get('/', (req, res, next) => {
  // 1. Get all of the Users from the DB
  User.find({})
    // 2. Send them back to the client as JSON
    .then((users) => res.json(users))
    // 3. If there's an error pass it on!
    .catch(next);
});

//user login
router.post('/login', (req, res) => {
  //find a user with matching username and password
  User.findOne({
    username: req.body.username,
    password: req.body.password
  })
  //Send the user back to the client as JSON
  .then((user) => {
    res.json(user)
  })
  .catch(console.error);
});

// Show: Get a User by ID
router.get('/:id', (req, res) => {
  //Find the User by its unique ID
  User.findById(req.params.id)
    //Send the user back to the client as JSON
    .then((user) => res.json(user))
    .catch(console.error);
});

// Create: Create a new User in the DB and return it
router.post('/', (req, res) => {
  // 1. Use the data in the req body to create a new User
  User.create(req.body)
    // 2. If the create is successful, send back the record that was inserted
    .then((user) => res.json(user))
    // 3. If there was an error, pass it on!
    .catch(console.error);
});

module.exports = router;