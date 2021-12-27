const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const config = require('./config/config').get(process.env.NODE_ENV);
const User = require('./models/user');
const Post = require('./models/post');
const auth = require('./middleware/auth');
const emailChecker = require('./middleware/emailCheck');
const profileUpload = require('./middleware/profileUpload');

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

// Connecting the mongoose and with it's Promise..
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
};

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, mongoOptions, function (error) {
    if (error) return console.log(error);
    console.log('------ Mongoose is connected! -------');
});

// Middleware..
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// GET..
// Profile (Auth)..
app.get('/api/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        // token: req.user.token
    });
});

// Current User Posts..
app.get('/api/current_user_posts', auth, (req, res) => {
    const currentLoggedInUserId = String(req.user._id);

    Post.find({ ownerId: currentLoggedInUserId }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(docs);
    });
});

// Showing specific User Posts..
app.get('/api/user_posts', (req, res) => {
    const userId = req.query.userId;

    Post.find({ ownerId: userId }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(docs);
    });
});

// Logout User..
app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(function (err) {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            msg: 'Logged-Out, session deleted!'
        });
    });
});


// POST..
// Uploading profile pic and update mongo users data..
app.post('/api/profile_upload', profileUpload.single("file"), (req, res) => {
    const userId = req.body.id;
    const fileName = req.file.originalname;

    // findByIdAndUpdate with database..
    User.findByIdAndUpdate({_id: userId}, {profilePhoto: fileName}, (error, user) => {
        if (error) return res.json({isUpdate: false, error});
        if (!user) return res.json({isUpdate: false, message: 'User not found!'});

        res.status(200).json({
            isUpdate: true,
            message: 'User updated and added profile.',
            user
        });
    });
});

// Login User..
app.post('/api/login', (req, res) => {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    User.findOne({ email: loginEmail }, function (err, user) {
        if (!user) return res.json({ isAuth: false, message: 'User not found!' });
        if (err) return res.json({ isAuth: false, message: 'Auth failed! wrong email!' });

        // compare password with registered user..
        user.comparePassword(loginPassword, function (err, isMatch) {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Auth failed! wrong password!'
            });
            if (err) return res.send(err);

            // ganarate token when user login with fine..
            user.ganarateToken(function (err, user) {
                if (err) throw res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                });
            });
        });
    });
});

// Register User..
app.post('/api/register', emailChecker, (req, res) => {
    const user = new User(req.body);

    user.save(function (error, docs) {
        if (error) return res.json({ success: false, error });
        res.status(200).json({
            success: true,
            message: 'User created successfully.',
            user: docs
        });
    });
});

// Create new Post..
app.post('/api/post', auth, (req, res) => {
    const post = new Post(req.body);

    const currentLoggedInUserId = String(req.user._id);
    // post.set('ownerId', currentLoggedInUserId);
    post.ownerId = currentLoggedInUserId;

    post.save(function (error, docs) {
        if (error) return res.json({ success: false, error });
        res.status(200).json({
            success: true,
            docs
        });
    });
});

// Update Post..
app.post('/api/post_update', (req, res) => {
    const id = req.body._id;
    const postBody = req.body;

    Post.findByIdAndUpdate({ _id: id }, postBody, { new: true }).then(docs => {
        res.status(200).json({
            success: true,
            docs
        });
    }).catch(err => {
        res.status(400).send(err);
    });
});

// Delete Post..
app.delete('/api/post_delete', (req, res) => {
    const id = req.query.id;

    Post.findByIdAndDelete(id, (err) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(true);
    });
});


// Listening to Server..
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});