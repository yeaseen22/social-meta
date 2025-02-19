import { Router } from 'express';
import { imageUpload } from '../middlewares';
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
 * ----- Create new Post ----
 */
router.post('/post_create', imageUpload.single("file"), postController.createPost);

/**
 * ----- Update Post ----
 */
router.post('/post_update', imageUpload.single("file"), postController.updatePost);

/**
 * ---- Delete Post ----
 */
router.delete('/post_delete', postController.deletePost);

export default router;
