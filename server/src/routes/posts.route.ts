import { Router } from 'express';
import { imageUpload } from '../middlewares';
import { PostController } from '../controllers';

const router = Router();

// Object instance for PostController Class..
const postController = new PostController();

/**
 * ----- READ POSTS -----
 * ----- CREATE POST -----
 */
router.route('/')
    .get(postController.readAllPosts)
    .post(imageUpload.single("file"), postController.createPost);

/**
 * ----- READ POST -----
 * ----- UPDATE POST -----
 * ----- DELETE POST -----
 */
router.route('/:postId')
    .get(postController.readPost)
    .put(imageUpload.single("file"), postController.updatePost)
    .delete(postController.deletePost);

/**
 * ----- Current User Posts -----
 */
router.get('/own', postController.currentUserPosts);

/**
 * ---- Showing specific User Posts ----
 */
router.get('/:userId/posts', postController.specificUserPosts);

export default router;
