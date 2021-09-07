//import express and instantiate express router
const express = require('express');
const router = express.Router();

const mongoose = require('../db/connection');
const User = require('../models/user-model');
const Post = require('../models/post-model');

//Examples
// router.get("/?user="menty", async (req, res) => {
// router.get("/?lang="react", async (req, res) => {

    router.get("/", async (req, res) => {
      const username = req.query.user;
      const tagName = req.query.tags;
      try {
        let posts;
        if (username) {
          posts = await Post.find({username});
        } else if (tagName) {
          posts = await Post.find({tags: {
              $in: [tagName],
            },
          });
        } else {
          posts = await Post.find();
        }
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
    });

    module.exports = router;