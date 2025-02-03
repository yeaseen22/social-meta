import { Router } from 'express';
import { postUpload } from '../middlewares';
import { PostController } from '../controllers';

const router = Router();

// Object instance for PostController Class..
const postController = new PostController();

/**
 * ---- Read Post ----
 */
router.get('/post_read', postController.readPost);

/**
 * ---- Get all Posts ----
 */
router.get('/read_all_posts', postController.readAllPosts);

/**
 * ----- Current User Posts -----
 */
router.get('/current_user_posts', postController.currentUserPosts);

/**
 * ---- Showing specific User Posts ----
 */
router.get('/user_posts', postController.specificUserPosts);

/**
 * ---- Make Like a Post ----
 * Binded method to avoid 'this' keyword error.
 * The Error was for 'this' keyword. which is about lost context of 'this' keyword.
 * This error came when we are using callback function as Express routes and controller.
 */
router.post('/post_like', postController.likePost.bind(postController));

/**
 * ---- Get Post Likes ----
 * Binded method to avoid 'this' keyword error.
 * The Error was for 'this' keyword. which is about lost context of 'this' keyword.
 * This error came when we are using callback function as Express routes and controller.
 */
router.get('/:postId/likes', postController.getPostLikes.bind(postController));

/**
 * ----- Create new Post ----
 */
router.post('/post_create', postUpload.single("file"), postController.createPost);

/**
 * ----- Update Post ----
 */
router.post('/post_update', postUpload.single("file"), postController.updatePost);

/**
 * ---- Delete Post ----
 */
router.delete('/post_delete', postController.deletePost);

export default router;
