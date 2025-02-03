import mongoose, { Schema, Document } from 'mongoose';

// region Notification Interface..
export interface INotification extends Document {
    recipientId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    type: string;
    read: boolean;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

// region Notification Schema..
const NotificationScheme = new Schema<INotification>({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'follow', 'message'],
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// region Notification Model..
const Notification = mongoose.model<INotification>('Notification', NotificationScheme);
export default Notification;