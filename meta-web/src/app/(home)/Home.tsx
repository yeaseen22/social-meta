"use client"

import { useState } from "react"
import styles from "@/styles/components/tweetcard.module.scss"
import { TweetCard } from "@/components/common";
import CreateInput from "@/components/common/CreateInput";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import TweetCardSkeleton from "@/components/widgets/CardSkeletion"
import { SearchModal } from "@/components/SearchModal";
import { NotFound } from "@/components/widgets";
import { usePosts } from "@/hooks/use-post"

interface Post {
  _id: string;
  body: string;
  createdAt: string;
  likes_count: number;
  comments_count: number;
  owner: {
    firstname: string;
    lastname: string;
    profilePhoto?: string;
    title: string;
  };
}

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const { posts, isLoading, error, hasMore } = usePosts(page, 5) as unknown as { posts: Post[], isLoading: boolean, error: any, hasMore: boolean };

  const loadMorePosts = () => {
    console.log("Attempting to load more posts...");
    if (hasMore && !isLoading) {
      setPage((prevPage) => {
        console.log(`Incrementing page: ${prevPage + 1}`);
        return prevPage + 1;
      });
    }
  };


  const { loaderRef } = useInfiniteScroll(loadMorePosts, hasMore, isLoading);
  console.log('loadeerRef', loaderRef)
  console.log('has more', hasMore)

  if (error) {
    const errorMessage =
      error && typeof error === "object" && "data" in (error as any)
        ? ((error as any).data as { message: string }).message
        : "Something went wrong!";
    return <NotFound label={`Failed to load posts: ${errorMessage}`} />;
  }

  return (
    <div className={styles["tweets-area"]}>
      <CreateInput userProfileImage="https://via.placeholder.com/150" />
      {posts?.map((post: Post) => (
        <TweetCard key={post._id} post={post} />
      ))}
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => <TweetCardSkeleton key={index} />)}
      <div ref={loaderRef} />
    </div>
  );
};

export default Home;
