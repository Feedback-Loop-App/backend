//import express and instantiate express router
const express = require('express');
const router = express.Router();
const Post = require('../models/post-model');

router.get("/", async (req, res) => {

  const searchTerm = req.query.search;
    Post.find( { $or:[ 
      {'username':{ "$regex": searchTerm, "$options": "i" }}, 
      {'tags': {$in: [searchTerm]}}, 
      { "body": { "$regex": searchTerm, "$options": "i" }}
    ]}) 
    .then((posts) => res.json(posts))
    
});

    
module.exports = router;