const router = require('express').Router();
const userController = require('../controllers/user.controller');
const profileUpload = require('../middleware/profileUpload');
const { showUsersController } = require('../controllers/user.controller');

// temporary User Model here..
const User = require('../models/user');

/**
 * ==== The Testing API router and controller ====
 */
 router.get('/friends/:userId', async function(req, res){
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );

        let friendList = [];
        friends.map(friend => {
            const { _id, firstname, lastname, profilePhoto } = friend;
            friendList.push({ _id, firstname, lastname, profilePhoto });
        });
        res.status(200).json(friendList);

    } catch(error){
        res.status(500).json(error);
    }
});

/**
 * ==== Get All Users ====
 */
router.get('/read_all_users', showUsersController);

// // User Profile by id..
// router.get('/profile_by_id', userController.profileById);

// // Get User by OwnerId..
// router.get('/find_user', userController.postOwner);

// // User Profile..
// router.get('/profile', userController.profile);

// // Profile (Auth)..
// router.get('/auth', userController.profileAuth);

// // Logout User..
// router.get('/logout', userController.logout);

// // User's colorMode update..
// router.post('/user_colorMode_update', userController.updateColorMode);

// // User's themeMode update..
// router.post('/user_themeMode_updateName', userController.updateThemeMode);

// // Uploading profile pic and update mongo users data..
// router.post('/profile_upload', profileUpload.single("file"), userController.uploadProfilePic);


module.exports = router;