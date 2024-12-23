import mongoose, { Schema, Document } from 'mongoose';

// region Comment Interface..
export interface IComment extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
    updatedAt?: Date;
}

// region comment Schema...
const commentSchema = new Schema<IComment>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxlength: 1000,
    },
}, {
    timestamps: true
});

// region comment Model..
const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
