import { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/slice/auth.slice";

interface Post {
  _id: string;
  body: string;
  createdAt: string;
  likes_count: number;
  comments_count: number;
  owner: string; // Ensure ownerId is correctly mapped
}

export function usePosts(page: number, limit: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, isLoading, error, isFetching, refetch } = useGetPostsQuery({ page, limit });

  useEffect(() => {
    if (data?.posts?.posts?.length) {
      setPosts((prevPosts) => {
        const newPosts = data.posts.posts.filter(
          (newPost: { _id: string; }) => !prevPosts.some((prevPost) => prevPost._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  useEffect(() => {
    refetch(); // Ensure API is re-called when page changes
  }, [page]);


  const hasMore = Boolean(data?.posts?.hasNextPage);
  console.log("Fetched Posts:", posts);
  console.log("Has More:", hasMore);

  return {
    posts,
    isLoading: isLoading || isFetching,
    error: error ? "Failed to fetch posts" : null,
    hasMore,
    
  };
}
