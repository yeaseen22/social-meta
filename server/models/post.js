// Post Model..
const mongoose = require('mongoose');

// posts Schema..
const postSchema = mongoose.Schema({
    title: { type: String, required: true, maxLength: 200 },
    image: { type: String, required: true },
    body: { type: String, required: false, maxLength: 500, minLength: 100 },
    ownerId: { type: String, required: false }
}, {
    timestamps: true
});

// post Model..
const Post = mongoose.model('Post', postSchema);

module.exports = Post;