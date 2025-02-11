import { FollowerFollowing } from '../models';
import NotificationService from './notification.service';
import UserService from './user.service';
import { INotification } from '../models/Notification';

class FollowService {
    private readonly followerFollowingModelRepository: typeof FollowerFollowing;
    private readonly notificationService: NotificationService;
    private readonly userService: UserService;

    constructor(followerFollowingModelRepository: typeof FollowerFollowing = FollowerFollowing) {
        this.followerFollowingModelRepository = followerFollowingModelRepository;
        this.notificationService = new NotificationService();
        this.userService = new UserService();
    }

    /**
     * SEND FOLLOW REQUEST TO USER
     * This is responsible for sending the follow request to another user
     * @param followerId 
     * @param followingId 
     * @param io 
     */
    // region Send Follow Request
    public async sendFollowRequest(followerId: string, followingId: string, io: any) {
        try {
            // Check is follow request already exists
            const existingRequest = await this.followerFollowingModelRepository.findOne({ followerId, followingId });
            if (existingRequest) throw new Error('Follow request already sent or already following');

            // Create follow request
            await this.followerFollowingModelRepository.create({ followerId, followingId, status: 'pending' });

            // Send Notification and Save to DB for Notification Data save..
            const notification = await this.notificationService.createNotification({
                recipientId: followingId,
                senderId: followerId,
                type: "follow_request",
                message: "You got a recent follower!"
            } as INotification);

            // region Socket IO-TO 
            io.to(followerId.toString()).emit('notification', {
                message: notification.message,
                senderId: followerId,
                followingId,
                createdAt: notification.createdAt,
            });

            return { success: true, message: 'Follow request sent' };

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    /**
     * ACCEPT FOLLOW REQUEST
     * This is for accepting the follow request
     * @param followingId 
     * @param followerId 
     * @param io 
     * @returns 
     */
    // region Accept Follow Request
    public async acceptFollowRequest(followingId: string, followerId: string, io: any) {
        try {
            // Check if request exits
            const followRequest = await this.followerFollowingModelRepository.findOne({ followerId, followingId, status: 'pending' });
            if (!followRequest) throw new Error('Follow request not found');

            // Update follow request status to 'accepted'
            await this.followerFollowingModelRepository.findByIdAndUpdate(followRequest._id, { status: 'accepted' });

            // Update user follow counts
            await this.userService.updateUserInfo(followerId, { $inc: { followings_count: 1 } });
            await this.userService.updateUserInfo(followingId, { $inc: { followers_count: 1 } });

            // Send notificaiton to follower..
            const notification = await this.notificationService.createNotification({
                recipientId: followerId,
                senderId: followingId,
                type: "follow_accept",
                message: "Your follow request was accepted!",
            } as INotification);

            // region Socket IO-TO
            io.to(followingId.toString()).emit('notification', {
                message: notification.message,
                senderId: followingId,
                followerId,
                createdAt: notification.createdAt
            });

            return { success: true, message: 'Follow request accepted' };

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    // region Reject Follow Request
    public async rejectFollowRequest() {
        try {

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    // region UnFollow User
    public async unfollowUser() {
        try {

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    // region Get Followers
    public async getFollowers() {
        try {

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    // region Get Followings
    public async getFollowings() {
        try {

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };
}

export default FollowService;