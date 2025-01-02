import { Router, Request, Response, NextFunction } from 'express';
import { authRoutes, userRoutes, postRoutes, commentRoutes, conversationRoutes, messageRoutes } from '../routes';
import { auth as authenticate } from '../middlewares';

const router: Router = Router();

/**
 * ---- Routes For API Version 01 -----
 * Now moved API Rutes from /api/v1/ to /api/
 */
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/user', authenticate, userRoutes);
router.use('/api/v1/post', authenticate, postRoutes);
router.use('/api/v1/comment', authenticate, commentRoutes);

router.use('/api', authenticate, conversationRoutes);
router.use('/api', authenticate, messageRoutes);

/**
 * ---- Health Check for the application here ----
 * Checking for Health of application at very first time..
 */
router.get('/health', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        message: 'Successful'
    });
});

/**
 * ---- Resource not found endpoint ----
 * Not Found of resource
 */
router.use("*", (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).send("Resource not found!");
});

export default router;