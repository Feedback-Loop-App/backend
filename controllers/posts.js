//import express and instantiate express router
const express = require('express');
const router = express.Router();

// import post model
const Post = require('../models/post-model');

// Index: Get all the posts
router.get('/', (req, res, next) => {
  // 1. Get all of the posts from the DB
  Post.find({})
    // 2. Send them back to the client as JSON
    .then((posts) => res.json(posts))
    // 3. If there's an error pass it on
    .catch(next);
});

// Create: Create a new post in the DB and return it
router.post('/', (req, res, next) => {
    // 1. Use the data in the req body to create a new post
    Post.create(req.body)
      // 2. Send it back to the client as JSON
      .then((post) => res.json(post))
      // 3. If there's an error pass it on
      .catch(next);
  });

// Update: Update a posts in the DB and return all posts
router.put('/:id', (req, res, next) => {
    // 1. Use the data in the req body to update an existing post
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true })
      // 2. Send it back to the client as JSON
      .then((post) => res.json(post))
      // 3. If there's an error pass it on
      .catch(next);
  });

// Delete: DELETE the post with a given id from the database
router.delete('/:id', (req, res, next) => {
    // 1. Find a post by id and delete
    Post.findOneAndDelete({ _id: req.params.id })
      // 2. Send it back to the client as JSON
      .then((post) => res.json(post))
      // 3. If there's an error pass it on
      .catch(next);
  });

module.exports = router;