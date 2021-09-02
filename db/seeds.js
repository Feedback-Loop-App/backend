const mongoose = require('./connection');

const Posts = require('../models/post-model');
const postSeeds = require('./seeds.json');

//delete existing posts in DB
Posts.deleteMany({})
  .then(() => {
      //then insert dummy posts from seed file
    return Posts.insertMany(postSeeds);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });