import express from 'express';
import { CommentController } from '../controllers';

const router = express.Router();

// Object instance for CommentController Class..
const commentController = new CommentController();

/**
 * ---- Create Comment ----
 */
router.route('/').post(commentController.createComment.bind(commentController))
    .put(commentController.updateComment.bind(commentController));

/**
 * ---- Read Comments ----
 */
// region GET /comment/:postId?page=1&limit=5
router.get('/:postId', commentController.getComments.bind(commentController));

/**
 * ---- Delete Comment ----
 */
router.delete('/:commentId', commentController.deleteComment.bind(commentController));

export default router;