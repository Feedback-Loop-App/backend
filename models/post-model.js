// require the mongoose package from the connection pool
const mongoose = require("../db/connection");

// make a post schema
const PostSchema = new mongoose.Schema({
    user: String,
    title: String,
    body: String,
    likes: Number,
    comments: [String],
});

// instantiate the model
const Post = mongoose.model("Post", PostSchema);

// export the model
module.exports = Post;