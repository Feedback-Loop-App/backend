const express = require('express');
const router = express.Router();

// import post model
const Post = require('../models/post-model');

// Index: GET all the posts
router.get('/', (req, res, next) => {
  // 1. Get all of the posts from the DB
  Post.find({})
    // 2. Send them back to the client as JSON
    .then((bookmarks) => res.json(bookmarks))
    // 3. If there's an error pass it on
    .catch(next);
});

module.exports = router;