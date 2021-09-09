//import express and instantiate express router
const express = require('express');
const router = express.Router();

//import post model
const Post = require('../models/post-model');

router.get("/", (req, res) => {
  //get search term from query and look for regex containing search term
  const searchTerm = req.query.search;
  const closeMatch = { "$regex": searchTerm, "$options": "i" };
  //find close matches for search term in username, title, tags, or body
  Post.find( { $or:[ 
    {'username':closeMatch},
    {'title':closeMatch}, 
    {'tags':{$in: [searchTerm]}}, 
    { "body":closeMatch}
  ]})
  //send matching posts back to the client as json
  .then((posts) => res.json(posts))
  .catch(console.error);

});
    
module.exports = router;