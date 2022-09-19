const router = require("express").Router(),
    authRoutes = require('../routes/auth'),
    usersRoutes = require('../routes/users'),
    postsRoutes = require('../routes/posts'),
    commentsRoutes = require('../routes/comments'),
    conversationsRoutes = require('../routes/conversations'),
    messagesRoutes = require('../routes/messages');

// Middlewares..
const authenticate = require('../middleware/auth');


router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, usersRoutes);
router.use('/api/v1/posts', authenticate, postsRoutes);
router.use('/api/v1/comments', authenticate, commentsRoutes);
router.use('/api/v1/conversations', authenticate, conversationsRoutes);
router.use('/api/v1/messages', authenticate, messagesRoutes);


/**
 * Checking for Health of application at very first time..
 */
router.get('/health', (_req, res) => {
    res.status(200).json({
        message: 'Successful'
    });
});

module.exports = router;