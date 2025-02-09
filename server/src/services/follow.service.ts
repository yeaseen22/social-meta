import { FollowerFollowing } from '../models';

class FollowService {
    private readonly followerFollowingModelRepository: typeof FollowerFollowing;

    constructor(followerFollowingModelRepository: typeof FollowerFollowing = FollowerFollowing) {
        this.followerFollowingModelRepository = followerFollowingModelRepository;
    }

    // region Send Follow Request
    public async sendFollowRequest() {
        try {

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    };

    // region Accept Follow Request
    public async acceptFollowRequest() {
        try {

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