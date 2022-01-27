const User = require('../models/user');

// post Owner..
exports.postOwner = function(req, res){
    const ownerId = req.query.ownerId;

    User.findById({_id: ownerId}, (error, user) => {
        if (error) return res.send(error);
        if (!user) return res.json({isUserFound: false, message: "User not found!"});

        res.status(200).json({
            isUserFound: true,
            foundUser: {
                firstname: user.firstname,
                lastname: user.lastname,
                profilePhoto: user.profilePhoto,
                title: user.title
            }
        });
    });
};

// forgot password..
exports.forgotPassword = function(req, res){
    res.send('this is forgot password here !');
    res.end();
};

// user profile..
exports.profile = function(req, res){
    res.status(200).json({
        isAuth: true,
        id: req.user._id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        title: req.user.title,
        email: req.user.email,
        bio: req.user.bio,
        profilePhoto: req.user.profilePhoto,
        coverPhoto: req.user.coverPhoto,
        birthdate: req.user.birthdate,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
    });

    console.log(req);
    res.end();
};

// Profile (Auth)..
exports.profileAuth = function(req, res){
    res.status(200).json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        // token: req.user.token
    });
};

// Logout User..
exports.logout = function(req, res){
    req.user.deleteToken(function (err) {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            isAuth: false,
            msg: 'Logged-Out, session deleted!'
        });
    });
};

// Uploading profile pic and update mongo users data..
exports.uploadProfilePic = function(req, res){
    const userId = req.body.id;
    const fileName = req.file.originalname;

    // findByIdAndUpdate with database..
    User.findByIdAndUpdate({ _id: userId }, { profilePhoto: fileName }, (error, user) => {
        if (error) return res.json({ isUpdate: false, error });
        if (!user) return res.json({ isUpdate: false, message: 'User not found!' });

        res.status(200).json({
            isUpdate: true,
            message: 'User updated and added profile.',
            user
        });
    });
};

// Login User..
exports.login = function (req, res){
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    User.findOne({ email: loginEmail }, function (err, user) {
        if (err) return res.json({ isAuth: false, message: 'Auth failed! wrong email!' });
        if (!user) return res.json({ isAuth: false, message: 'User not found!' });

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
};

// Register User..
exports.register = function (req, res){
    const user = new User(req.body);

    user.save(function (error, docs) {
        if (error) return res.json({ success: false, error });
        res.status(200).json({
            success: true,
            message: 'User created successfully.',
            user: docs
        });
    });
};
