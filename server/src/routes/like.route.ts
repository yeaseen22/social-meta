import express from 'express';
import { LikeController } from '../controllers';

const router = express.Router();

// Object instance for CommentController Class..
const likeController = new LikeController();

/**
 * ---- Toggle Like/Dislike ----
 */
router.post('/toggle', likeController.toggleLike);

/**
 * ---- Read Likes ----
 */
// region GET /likes/:postId?page=1&limit=5
router.get('/:postId', likeController.getPostLikes);


export default router;