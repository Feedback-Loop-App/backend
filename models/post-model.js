// require the mongoose package from the connection pool
const mongoose = require("../db/connection");

// make a post schema
const PostSchema = new mongoose.Schema({
    username: {
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
        type: Array,
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    owner: {
        // References use the type ObjectId
        type: mongoose.Schema.Types.ObjectId,
        // name of the relevant model
        ref: 'User',
      },
    },
    { timestamps: true },
);

// instantiate the model
const Post = mongoose.model("Post", PostSchema);

// export the model
module.exports = Post;