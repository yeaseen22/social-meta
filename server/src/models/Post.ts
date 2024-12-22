// Post Model..
import { Schema, model } from 'mongoose';

// posts Schema..
const postSchema = new Schema({
    image: { type: String, required: false },
    body: { type: String, required: false, maxLength: 2000 },
    ownerId: { type: String, required: false },
    likes_count: { type: Number, required: false, default: 0 },
    comments_count: { type: Number, required: false, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// post Model..
const Post = model('Post', postSchema);

export default Post;
