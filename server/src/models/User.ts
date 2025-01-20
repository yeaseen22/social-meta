import mongoose, { Schema } from 'mongoose';
// import JWT from 'jsonwebtoken';

// user Schema..
// region User Schema
const userSchema = new Schema({
    firstname: { type: String, required: false, maxLength: 100 },
    lastname: { type: String, required: false, maxLength: 100 },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minLength: 7 },
    bio: { type: String, required: false },
    profilePhoto: { type: String, default: "avatar" },
    coverPhoto: { type: String, default: "cover" },
    birthdate: { type: String },
    title: { type: String },
    themeMode: { type: String, required: false, default: 'lightMode' },
    colorMode: { type: String, required: false, default: 'royalblue' },
    token: { type: String },
    followings_count: { type: Number, required: false, default: 0 },
    followers_count: { type: Number, required: false, default: 0 },
    refreshToken: { type: String },
}, {
    timestamps: true
});

// // Schema Middleware to hashing password..
// userSchema.pre('save', function (next: any) {
//     const user = this;

//     if (user.isModified('password')) {
//         bcrypt.genSalt(SALT_I, (err: Error | undefined, salt: string) => {
//             if (err) return next(err);

//             bcrypt.hash(user.password, salt, (err: Error | undefined, hash: string) => {
//                 if (err) return next(err);

//                 user.password = hash;
//                 next();
//             });
//         });

//     } else {
//         next();
//     }
// });

// // Compare password method using Promise
// userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, this.password, (err: Error | undefined, isMatch: boolean) => {
//             if (err) return reject(err);
//             resolve(isMatch);
//         });
//     });
// };

// // Generate token method using Promise
// userSchema.methods.generateToken = function (): Promise<string> {
//     const token = JWT.sign(this._id.toHexString(), String(process.env.SECRET));
//     this.token = token;
//     return this.save().then(() => token);
// };

// // Find by token static method using Promise
// userSchema.statics.findByToken = function (token: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//         JWT.verify(token, String(process.env.SECRET), { algorithms: ['HS256'] }, (err: any, decodedToken: any) => {
//             if (err) return reject(err);

//             this.findOne({ _id: decodedToken, token: token })
//                 .then((user: any) => resolve(user))
//                 .catch((err: any) => reject(err));
//         });
//     });
// };

// // Delete token method using Promise
// userSchema.methods.deleteToken = function (): Promise<void> {
//     return this.updateOne({ $unset: { token: 1 } });
// };

// user Model..
//  region User Model
const User = mongoose.model('User', userSchema);

export default User;
