// Post Model..
const mongoose = require('mongoose');

// posts Schema..
const postSchema = mongoose.Schema({
    image: { type: String, required: false },
    body: { type: String, required: false, maxLength: 1000, },
    ownerId: { type: String, required: false }
}, {
    timestamps: true
});

// post Model..
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
