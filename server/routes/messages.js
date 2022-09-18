const router = require('express').Router();
const messageController = require('../controllers/message.controller');

/**
 * Messages Route..
 */
// Add..
router.post('/message_create', messageController.createMessage);
// Read..
router.get('/message/:conversationId', messageController.getMessageByConversationId);

module.exports = router;