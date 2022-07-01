// Comment Model..
const mongoose = require('mongoose');

// comment Schema...
const commentSchema = mongoose.Schema({
    comment: { type: String, required: false },
    ownerId: { type: String, required: false },
    postId: { type: String, required: false },
}, {
    timestamps: true
});

// comment Model..
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;