import { Comment, Post } from '../models';

class CommentService {
    private readonly commentModelRepository: typeof Comment;
    private readonly postModelRepository: typeof Post;

    constructor(commentModelRepository: typeof Comment = Comment, postModelRepository: typeof Post = Post) {
        this.commentModelRepository = commentModelRepository;
        this.postModelRepository = postModelRepository;
    }

    /**
     * FETCH COMMENTS SERVICE
     * @param postId 
     * @param page 
     * @param limit 
     */
    public async fetchComments(postId: string, page: number = 1, limit: number = 10): Promise<any> {
        try {
            // Calculate the number of comments to skip
            const skip = (page - 1) * limit;

            // Fetch comments with pagination
            const comments = await this.commentModelRepository.find({ postId })
                .populate('userId', 'firstname lastname email profilePhoto')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec();

            // Extract data from the populated comments
            const commentsData = comments?.map(comment => {
                return {
                    _id: comment._id,
                    user: comment.userId,
                    comment: comment.comment,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt
                };
            });

            return { success: true, comments: commentsData };

        } catch (error) {
            console.error(`Error in fetchComments service: ${error}`);
            throw error;
        }
    }

    /**
     * CREATE COMMENT SERVICE
     * @param userId 
     * @param postId 
     * @param comment 
     * @returns 
     */
    public async createComment(userId: string, postId: string, comment: string): Promise<any> {
        try {
            const newComment = await this.commentModelRepository.create({ userId, postId, comment });
            await this.postModelRepository.findByIdAndUpdate(postId, {
                $inc: { comments_count: 1 }
            });

            return { success: true, message: "Comment created.", comment: newComment };

        } catch (error) {
            console.error(`Error in createComment service: ${error}`);
            throw error;
        }
    }

    /**
     * UPDATE COMMENT SERVICE
     * @param commentId 
     */
    public async updateComment(commentId: string, newComment: string): Promise<any> {
        try {
            const comment = await this.commentModelRepository.findById(commentId);
            if (!comment) throw new Error('Comment not found!');

            // Update the comment
            comment.comment = newComment;
            await comment.save();

            return { success: true, message: "Comment updated." };

        } catch (error) {
            console.error(`Error in updateComment service: ${error}`);
            throw error;
        }
    }

    /**
     * DELETE COMMENT SERVICE
     * @param commentId 
     */
    public async deleteComment(commentId: string): Promise<any> {
        try {
            const comment = await this.commentModelRepository.findById(commentId);
            if (!comment) throw new Error('Comment not found!');

            // Delete the comment
            await this.commentModelRepository.deleteOne({ _id: commentId });
            await this.postModelRepository.findByIdAndUpdate(comment.postId, {
                $inc: { comments_count: -1 }
            });

            return { success: true, message: "Comment deleted." };

        } catch (error) {
            console.error(`Error in deleteComment service: ${error}`);
            throw error;
        }
    }
}

export default CommentService;