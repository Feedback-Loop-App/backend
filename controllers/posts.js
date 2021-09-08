//import express and instantiate express router
const express = require('express');
const router = express.Router();

// import post model
const Post = require('../models/post-model');

// Index: Get all the posts
router.get('/', (req, res) => {
  // 1. Get all of the posts from the DB
  Post.find({})
    // 2. Send them back to the client as JSON
    .then((posts) => res.json(posts))
    .catch(console.error);
});

// Create: Create a new post in the DB and return it
router.post('/', (req, res) => {
    // 1. Use the data in the req body to create a new post
    Post.create(req.body)
      // 2. Send it back to the client as JSON
      .then(() => {
        Post.find({})
        .then((posts) => res.json(posts))
        .catch(console.error)
      })
      .catch(console.error);
  });

// Update: Update a posts in the DB and return all posts
router.put('/:id', (req, res) => {
    // 1. Use the data in the req body to update an existing post
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true })
      // 2. Send it back to the client as JSON
      .then(() => {
        Post.find({})
        .then((posts) => res.json(posts))
        .catch(console.error)
      })
      .catch(console.error);
  });

// Delete the post with a given id from the database
router.delete('/:id', (req, res) => {
    //Find a post by id and delete
    Post.findOneAndDelete({ _id: req.params.id })
      //Find and send all posts back to the client as JSON
      .then(() => {
        Post.find({})
        .then((posts) => res.json(posts))
        .catch(console.error)
      })
      //Find and send all posts back to the client as JSON
      .catch(console.error);
  });

module.exports = router;