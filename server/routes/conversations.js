const router = require('express').Router();
const conversationController = require('../controllers/conversation.controller');

/**
 * Conversation Route..
 */
 router.post('/conversation_create', conversationController.createConversation);
 router.get('/conversation/:userId', conversationController.getConversationByUserId);
 
module.exports = router;