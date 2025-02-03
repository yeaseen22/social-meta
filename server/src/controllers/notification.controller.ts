import { NextFunction, Request, Response } from 'express';
import { NotificationService } from '../services';

class NotificationController {
    private readonly notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    /**
     * GET USER NOTIFICATIONS
     * This is for getting the user notifications
     * @param req 
     * @param res 
     * @param next 
     */
    public getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user._id;
            const { page, limit } = req.query;

            const notifications = await this.notificationService.getUserNotifications(userId, Number(page), Number(limit));
            if (!notifications) res.status(404).json({ 
                success: false, 
                message: 'No notifications found' 
            });

            res.status(200).json(notifications);

        } catch (error) {
            next(error);
        }
    }

    /**
     * MARK NOTIFICATION AS READ
     * This is for marking the notification as read
     * @param req 
     * @param res 
     * @param next 
     */
    public markNotificationAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const notificationId = req.params.notificationId;
            
            // Mark the notification as read
            await this.notificationService.markNotificationAsRead(notificationId);
            res.status(200).json({ success: true, message: 'Notification marked as read' });

        } catch (error) {
            next(error);
        }
    }
}

export default NotificationController;
