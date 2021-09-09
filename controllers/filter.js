//import express and instantiate express router
const express = require('express');
const router = express.Router();
const Post = require('../models/post-model');

router.get("/", async (req, res) => {

  const searchTerm = req.query.search;
  const closeMatch = { "$regex": searchTerm, "$options": "i" };
    Post.find( { $or:[ 
      {'username':closeMatch},
      {'title':closeMatch}, 
      {'tags':{$in: [searchTerm]}}, 
      { "body":closeMatch}
    ]}) 
    .then((posts) => res.json(posts))
    
});

    
module.exports = router;