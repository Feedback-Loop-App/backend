const mongoose = require('./connection');

const User = require('../models/user-model');
const userSeeds = require('./user-seeds.json');

//delete existing Users
User.deleteMany({})
  .then(() => {
    //then insert dummy users from seed file
  return User.insertMany(userSeeds);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  })