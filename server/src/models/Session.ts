import mongoose, { Schema, Document } from 'mongoose';

// region Session Interface
export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    deviceId: string;
    refreshToken: string;
    loginDate?: Date;
    lastActiveDate?: Date;
}

// region Session Schema
const sessionSchema: Schema<ISession> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deviceId: { type: String, required: true },
    refreshToken: { type: String, required: true },
    loginDate: { type: Date, required: true, default: Date.now },
    lastActiveDate: { type: Date, required: true, default: Date.now }
});

// region Session Model
const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;