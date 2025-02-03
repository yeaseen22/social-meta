import { Notification } from '../models';
import mongoose from 'mongoose';

class NotificationService {
    private readonly notificationModelRepository: typeof Notification;

    constructor(notificationModelRepository: typeof Notification = Notification) {
        this.notificationModelRepository = notificationModelRepository;
    }

    /**
     * GET USER NOTIFICATIONS SERVICE
     * Normal way of doing without aggregation
     * @param userId 
     * @param page 
     * @param limit 
     */
    public async getUserNotifications(userId: string, page: number = 1, limit: number = 10): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            const [notifications, total] = await Promise.all([
                this.notificationModelRepository.find({ recipientId: userId })
                    .populate('senderId', 'firstname lastname profilePhoto')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),

                this.notificationModelRepository.countDocuments({ recipientId: userId })
            ]);

            return { success: true, notifications, total };

        } catch (error) {
            console.error(`Error in getUserNotifications service: ${error}`);
            throw error;
        }
    }

    /**
     * MARK NOTIFICATION AS READ SERVICE
     * This for marking the notification as read
     * @param notificationId 
     */
    public async markNotificationAsRead(notificationId: string): Promise<void> {
        try {
            await this.notificationModelRepository.findByIdAndUpdate(notificationId, { read: true });

        } catch (error) {
            console.error(`Error in markNotificationAsRead service: ${error}`);
            throw error;
        }
    }
}

export default NotificationService;