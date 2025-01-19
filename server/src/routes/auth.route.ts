import express from 'express';
import { emailChecker, validationReq } from '../middlewares';
// import { AuthValidation } from '@/utils/validation';
import { AuthValidation } from '../utils/validation';
import { AuthController } from '../controllers';

const router = express.Router();

// Object instance for AuthController Class..
const authController = new AuthController();

/**
 * ---- Login User ----
 */
router.post('/login', validationReq(AuthValidation.loginUser), authController.login);

/**
 * ---- Register User ----
 */
router.post('/register', emailChecker, validationReq(AuthValidation.registerUser), authController.register);

/**
 * ---- Forgot Password ----
 */
router.get('/forgot_password', authController.forgotPassword);

export default router;