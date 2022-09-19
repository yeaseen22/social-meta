const User = require('../models/user');
const error = require('../utils/error');

/**
 * ---- Register Controller ----
 * @param {*} req 
 * @param {*} res 
 * @param {*} _next 
 */
const registerController = function (req, res, _next) {
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

/**
 * ---- Login Controller ----
 * @param {*} req 
 * @param {*} res 
 * @param {*} _next 
 */
const loginController = function (req, res, next) {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    try {
        User.findOne({ email: loginEmail }, function (err, user) {
            // if (err) return res.json({ isAuth: false, message: 'Auth failed! wrong email!' });
            if (err) throw error('Auth failed! Wrong email!', 400);
            // if (!user) return res.json({ isAuth: false, message: 'User not found!' });
            if (!user) return error('User not found!', 400);

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

                    res.cookie('auth', token).json({
                        isAuth: true,
                        id: user._id,
                        email: user.email
                    });
                });
            });
        });

    } catch(error) {
        res.status(400).send(error);
    }
};

/**
 * ---- Forgot Password Controller ----
 * @param {*} req 
 * @param {*} res 
 */
const forgotPasswordController = (_req, res) => {
    res.status(200).send('Route for forgot password!');
};

module.exports = {
    loginController,
    registerController,
    forgotPasswordController
};