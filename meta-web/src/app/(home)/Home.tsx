"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/layouts/home-layout.module.scss";
import { TweetCard } from "@/components/common";
import CreateInput from "@/components/common/CreateInput";
import { useGetPostsQuery } from "@/redux/slice/auth.slice";
import { NotFound } from "@/components/widgets";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SkeletonPost from "@/components/widgets/Skeletion";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { data, isFetching, isError, error } = useGetPostsQuery({ page, limit: 5 });

  useEffect(() => {
    if (data && data.posts?.posts?.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts.posts]);
      setHasMore(data.posts.hasNextPage);
      setIsLoadingMore(false);
    }
  }, [data]);

  const loadMorePosts = () => {
    if (hasMore && !isLoadingMore && !isFetching) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const { loaderRef } = useInfiniteScroll(loadMorePosts, hasMore);

  if (isError) {
    const errorMessage =
      error && typeof error === "object" && "data" in error
        ? (error.data as { message: string }).message
        : "Something went wrong!";
    return <NotFound label={`Failed to load posts: ${errorMessage}`} />;
  }

  return (
    <div className={styles["tweets-area"]}>
    <CreateInput userProfileImage="https://via.placeholder.com/150" />

    {isFetching && posts.length === 0 ? (
      Array.from({ length: 5 }).map((_, index) => (
        <SkeletonPost key={index} />
      ))
    ) : (
      posts.map((post) => <TweetCard key={post._id} post={post} />)
    )}

    {/* Show the loader when there are more posts to load */}
    {hasMore && !isFetching && !isLoadingMore && (
      <div ref={loaderRef}>Loading more posts...</div>
    )}

    {/* Show loading skeletons if more posts are being fetched */}
    {isLoadingMore && (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    )}
  </div>
  );
};

export default Home;
