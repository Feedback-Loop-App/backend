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

// Show: Get a User by ID
router.get('/:id', (req, res, next) => {
  // 1. Find the User by its unique ID
  User.findById(req.params.id)
    // 2. Send it back to the client as JSON
    .then((user) => res.json(user))
    // 3. If there's an error pass it on!
    .catch(next);
});

// Create: Create a new resource in the DB and return it
router.post('/', (req, res, next) => {
  // 1. Use the data in the req body to create a new User
  User.create(req.body)
    // 2. If the create is successful, send back the record that was inserted
    .then((user) => res.json(user))
    // 3. If there was an error, pass it on!
    .catch(next);
});

module.exports = router;