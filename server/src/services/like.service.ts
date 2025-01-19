import { Like, Post } from '../models';

class LikeService {
    private readonly likeModelRepository: typeof Like;
    private readonly postModelRepository: typeof Post;

    constructor(likeModelRepository: typeof Like = Like, postModelRepository: typeof Post = Post) {
        this.likeModelRepository = likeModelRepository;
        this.postModelRepository = postModelRepository;
    }


    /**
     * LIKE POST SERVICE
     * @param postId 
     * @returns {Promise<[]>}
     */
    public async getPostLikes(postId: string): Promise<any[]> {
        try {
            const likes = await this.likeModelRepository.find({ postId })
                .populate('userId', 'firstname lastname email profilePhoto');

            // Extract data from the populated likes
            const likesData = likes?.map(like => {
                return {
                    user: like.userId,
                    createdAt: like.createdAt,
                    updatedAt: like.updatedAt
                };
            })

            return likesData;

        } catch (error) {
            console.error(`Error in getPostLikes service: ${error}`);
            throw error;
        }
    }

    /**
     * TOGGLE LIKE SERVICE
     * @param userId 
     * @param postId 
     * @returns {Promise<{ success: boolean, message: string, likeStatus: boolean }>}
     */
    public async toggleLike(userId: string, postId: string): Promise<{ success: boolean, message: string, likeStatus: boolean }> {
        try {
            const existingLike = await this.likeModelRepository.findOne({ userId, postId });

            if (existingLike) {
                // Dislike the post..
                return await this.dislikePost(userId, postId);

            } else {
                // Like the post..
                return await this.likePost(userId, postId);
            }

        } catch (error) {
            console.error(`Error in toggleLike service: ${error}`);
            throw error;
        }
    }

    /**
     * LIKE POST SERVICE (Private)
     * @param userId 
     * @param postId 
     * @returns 
     */
    private async likePost(userId: string, postId: string): Promise<{ success: boolean, message: string, likeStatus: boolean }> {
        try {
            const newLike = new this.likeModelRepository({ userId, postId });
            await newLike.save();
            await this.postModelRepository.findByIdAndUpdate(postId, {
                $inc: { likes_count: 1 }
            });

            return { success: true, message: "Post liked.", likeStatus: true };

        } catch (error) {
            console.error(`Error in likePost service: ${error}`);
            throw error;
        }
    }

    /**
     * DISLIKE POST SERVICE (Private)
     * @param userId 
     * @param postId 
     * @returns 
     */
    private async dislikePost(userId: string, postId: string): Promise<{ success: boolean, message: string, likeStatus: boolean }> {
        try {
            await this.likeModelRepository.deleteOne({ userId, postId });
            await this.postModelRepository.findByIdAndUpdate(postId, {
                $inc: { likes_count: -1 }
            });

            return { success: true, message: "Post disliked.", likeStatus: false };

        } catch (error) {
            console.error(`Error in dislikePost service: ${error}`);
            throw error;
        }
    }
}

export default LikeService;