import { NextFunction, Request, Response } from 'express';
import { LikeService } from '../services';

class LikeController {
    private readonly likeService: LikeService;

    constructor() {
        this.likeService = new LikeService();
    }

    /**
     * ---- Get/Read Likes ----
     * @param {Request} req 
     * @param {Response} res 
     */
    public getPostLikes = async (req: Request, res: Response, next: NextFunction) => {
        const postId: string = req.params.postId;
        const { page, limit } = req.query;

        if (!postId) {
            throw new Error('Post ID is required');
        }

        try {
            // Fetch likes from the service
            const likes = await this.likeService.getPostLikes(postId, Number(page), Number(limit));
            if (!likes || likes.length === 0) {
                res.status(404).json({ success: false, message: 'No likes found' });
            }

            res.status(200).json(likes);

        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * ---- Like on Post ----
     * @param {Request} req 
     * @param {Response} res 
     */
    public toggleLike = async (req: Request, res: Response) => {
        const { postId } = req.body;
        const userId = (req as any).user._id;

        if (!postId) {
            throw new Error('Post ID is required');
        }

        try {
            // Toggle like using the service
            const toggledLike = await this.likeService.toggleLike(userId, postId);
            if (!toggledLike) {
                res.status(400).json({ success: false, message: 'Failed to create comment' });
            }

            res.status(200).json(toggledLike);

        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }
}

export default LikeController;
