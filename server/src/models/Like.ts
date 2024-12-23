import mongoose, { Schema, Document } from "mongoose";

// Like Interface
export interface ILike extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}

// Like Schema
const LikeSchema = new Schema<ILike>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Like Model
const Like = mongoose.model<ILike>('Like', LikeSchema);
export default Like;