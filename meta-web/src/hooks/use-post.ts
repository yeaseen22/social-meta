import { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/redux/slice/auth.slice";

interface Post {
  _id: string;
  body: string;
  createdAt: string;
  likes_count: number;
  comments_count: number;
  ownerId: {
    firstname: string;
    lastname: string;
    profilePhoto?: string;
    title: string;
  };
}

export function usePosts(initialPage: number, limit: number) {
  const [page, setPage] = useState(initialPage);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, isLoading, error, isFetching } = useGetPostsQuery({
    page,
    limit,
  });

  useEffect(() => {
    if (data?.posts?.posts?.length) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts.posts]);
    }
  }, [data]);

  const hasMore = data?.posts?.hasNextPage || false;

  return {
    posts,
    isLoading: isLoading || isFetching,
    error: error ? "Failed to fetch posts" : null,
    hasMore,
    setPage,
  };
}
