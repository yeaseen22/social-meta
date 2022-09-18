const router = require('express').Router();
const emailChecker = require('../middleware/emailCheck');
const { loginController, registerController, forgotPasswordController } = require('../controllers/auth');


// Login User..
router.post('/login', loginController);

// Register User..
router.post('/register', emailChecker, registerController);

// Forgot Password..
router.get('/forgot_password', forgotPasswordController);

module.exports = router;