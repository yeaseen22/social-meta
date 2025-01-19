import { Request, Response, NextFunction } from 'express';
import { Post } from '../models';
import { Types } from 'mongoose';

class PostService {
    private readonly postModelRepository: typeof Post;

    constructor(userModelRepository: typeof Post = Post) {
        this.postModelRepository = userModelRepository;
    }


    /**
     * READ POST SERVICE
     * This is for reading an individual post
     * @param postId 
     * @returns 
     */
    public async readPost(postId: string): Promise<any> {
        try {
            const post = await this.postModelRepository.find({ _id: postId })
                .populate("user", "firstname lastname profilePhoto title themeMode colorMode email")
                .exec();

            if (!post) throw new Error('Post not found!');
            return post;

        } catch (error) {
            console.error('Failed to read post:', error);
            throw new Error('Failed to read post');
        }
    }

    /**
     * READ ALL POSTS SERVICE
     * This is for reading all posts
     * @param page 
     * @param limit 
     */
    public async readAllPosts(page: number = 1, limit: number = 5): Promise<any> {
        try {
            const posts = await this.postModelRepository.find({})
                .populate({
                    path: "ownerId",
                    model: "User",
                    select: "firstname lastname profilePhoto email title"
                })
                .sort([["createdAt", -1]])
                .skip((page - 1) * limit)
                .limit(limit);

            // Filter out posts where `ownerId` is null (user no longer exists)
            const filteredPosts = posts.filter(post => post.ownerId !== null);

            // Count the total number of valid posts for pagination
            const total = filteredPosts.length;
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;
            const hasPreviousPage = page > 1;

            return {
                success: true,
                posts: filteredPosts,
                total,
                totalPages,
                hasNextPage,
                hasPreviousPage,
                page,
                limit,
            };

        } catch (error) {
            console.error('Failed to read all posts:', error);
            throw new Error('Failed to read all posts');
        }
    }
}

export default PostService;