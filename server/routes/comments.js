const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// Read Comment..
router.get('/read_comment', commentController.readComment);

// Make Comment..
router.post('/make_comment', commentController.createComment);

// Update Comment..
router.post('/update_comment', commentController.updateComment);

// Delete Comment..
router.delete('/comment_delete', commentController.deleteComment);

module.exports = router;