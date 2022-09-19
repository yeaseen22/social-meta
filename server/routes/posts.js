const router = require('express').Router();
const postUpload = require('../middleware/postUpload');
const postController = require('../controllers/post.controller');

// Get Likes from Post...
router.get('/get_post_likes', postController.getLikes);

// Read Post..
router.get('/post_read', postController.readPost);

// Get all Posts..
router.get('/read_all_posts', postController.readAllPosts);

// Current User Posts..
router.get('/current_user_posts', postController.currentUserPosts);

// Showing specific User Posts..
router.get('/user_posts', postController.specificUserPosts);

// Make Like a Post..
router.post('/post_like', postController.likePost);

// Create new Post..
router.post('/post_create', postUpload.single("file"), postController.createPost);

// Update Post..
router.post('/post_update', postUpload.single("file"), postController.updatePost);

// Delete Post..
router.delete('/post_delete', postController.deletePost);

module.exports = router;