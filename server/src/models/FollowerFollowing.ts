import mongoose, { Document, Schema } from 'mongoose';

// region Interface
export interface IFollowerFollowing extends Document {
    followerId: mongoose.Types.ObjectId;
    followingId: mongoose.Types.ObjectId;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date,
    updatedAt?: Date
}

// region Schema
const FollowerFollowingSchema = new Schema<IFollowerFollowing>(
    {
        followerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        followingId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    },
    {
        timestamps: true
    }
);

// region Model
const FollowerFollowing = mongoose.model<IFollowerFollowing>('FollowerFollowing', FollowerFollowingSchema);
export default FollowerFollowing;