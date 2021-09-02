// require the mongoose package from the connection pool
const mongoose = require("../db/connection");

// make a post schema
const PostSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments:{
        type: [String],
        default: []
    },
});

// instantiate the model
const Post = mongoose.model("Post", PostSchema);

// export the model
module.exports = Post;