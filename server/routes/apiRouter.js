const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller'),
    postController = require('../controllers/post.controller'),
    commentController = require('../controllers/comment.controller'),
    auth = require('../middleware/auth'),
    emailChecker = require('../middleware/emailCheck'),
    profileUpload = require('../middleware/profileUpload'),
    postUpload = require('../middleware/postUpload');


/**----
 * ---- GET REQUESTS ---- ..
 * ----**/

// Get All Users..
router.get('/read_all_users', userController.showAllUsers);

// Get Likes from Post...
router.get('/get_post_likes', postController.getLikes);

// User Profile by id..
router.get('/profile_by_id', userController.profileById);

// Read Post..
router.get('/post_read', auth, postController.readPost);

// Get all Posts..
router.get('/read_all_posts', auth, postController.readAllPosts);

// Get User by OwnerId..
router.get('/find_user', auth, userController.postOwner);

// Forgot Password..
router.get('/forgot_password', userController.forgotPassword);

// User Profile..
router.get('/profile', auth, userController.profile);

// Profile (Auth)..
router.get('/auth', auth, userController.profileAuth);

// Current User Posts..
router.get('/current_user_posts', auth, postController.currentUserPosts);

// Showing specific User Posts..
router.get('/user_posts', postController.specificUserPosts);

// Logout User..
router.get('/logout', auth, userController.logout);


/**----
 * ---- POST REQUESTS ---- ..
 * ----**/

// Make Comment..
router.post('/make_comment', auth, commentController.createComment);

// Update Comment..
router.post('/update_comment', auth, commentController.updateComment);

// Make Like a Post..
router.post('/post_like', auth, postController.likePost);

// User's colorMode update..
router.post('/user_colorMode_update', auth, userController.updateColorMode);

// User's themeMode update..
router.post('/user_themeMode_updateName', auth, userController.updateThemeMode);

// Uploading profile pic and update mongo users data..
router.post('/profile_upload', profileUpload.single("file"), userController.uploadProfilePic);

// Login User..
router.post('/login', userController.login);

// Register User..
router.post('/register', emailChecker, userController.register);

// Create new Post..
router.post('/post_create', auth, postUpload.single("file"), postController.createPost);

// Update Post..
router.post('/post_update', postUpload.single("file"), postController.updatePost);

/**----
 * ----- DELETE REQUESTS ---- ..
 * ----**/

// Delete Comment..
router.delete('/comment_delete', commentController.deleteComment);

// Delete Post..
router.delete('/post_delete', postController.deletePost);


module.exports = router;
