const mongoose = require('./connection');

const User = require('../models/user-model');
const postSeeds = require('./post-seeds.json');
const Post = require('../models/post-model');

//delete existing posts in DB
Post.deleteMany({})
  .then(() => User.deleteMany({}))
  .then(() => {
    return User.create({ username: 'coder123', email: 'coder123@gmail.com' })
      .then((user) =>
        postSeeds.map((post) => ({ ...post, owner: user._id, username: user.username}))
      )
      .then((posts) => Post.insertMany(posts));
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  })