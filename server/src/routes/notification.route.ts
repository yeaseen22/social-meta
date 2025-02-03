import express from 'express';
import { NotificationController } from '../controllers';

const router = express.Router();

// Object instance for CommentController Class..
const notificationController = new NotificationController();

/**
 * ---- Get Notifications ----
 */
// region GET /notifications/:postId?page=1&limit=5
router.get('/', notificationController.getNotifications);

/**
 * ---- Read Notifications ----
 */
// region PATCH /notifications/:notificationId/read
router.patch('/:notificationId/read', notificationController.markNotificationAsRead);


export default router;