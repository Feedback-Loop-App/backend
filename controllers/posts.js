const express = require('express');
const router = express.Router();

// import post model
const Post = require('../models/post-model');

// Index: GET all the posts
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
      // 2. If the create is successful, redirect to main page
      .then(() => {
        res.redirect('/')
      })
      //If there's an error pass it on
      .catch(next);
  });

// Update: Update a posts in the DB and return all posts
router.put('/:id', (req, res, next) => {
    // 1. Use the data in the req body to an existing gif
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true })
      // 2. If the update is successful, find all gifs for page reload
      .then(() => {
        Post.find({})
        .then((posts) => res.json(posts))
        .catch(next);
      })
  });

// Delete: DELETE the post with a given id from the database
router.delete('/:id', (req, res, next) => {
    // 1. Find the resource to delete
    Post.findOneAndDelete({ _id: req.params.id })
      // 2. If the delete is successful, find all gifs for page reload
      // Includes a return statement so that the .then() method doesn't return undefined
      // .then() must include a response for them to be  chained
      .then(() => {
        Post.find({})
        .then((posts) => res.json(posts))
        .catch(next);
      })
  });

module.exports = router;