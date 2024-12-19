import express, { Request, Response, NextFunction } from 'express';
import { emailChecker, validationReq } from '../middlewares';
import { UserSchema } from '../lib';
import { AuthController } from '../controllers';
import { User } from '../models';

const router = express.Router();

// Object instance for AuthController Class..
const authController = new AuthController();

/**
 * ---- Login User ----
 */
router.post('/login', validationReq(UserSchema.loginSchema), authController.login);

/**
 * ---- Register User ----
 */
router.post('/register', emailChecker, validationReq(UserSchema.registrationSchema), authController.register);

/**
 * ---- Forgot Password ----
 */
router.get('/forgot_password', authController.forgotPassword);

export default router;