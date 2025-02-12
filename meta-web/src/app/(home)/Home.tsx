// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "@/styles/layouts/home-layout.module.scss";
// import { TweetCard } from "@/components/common";
// import CreateInput from "@/components/common/CreateInput";
// import { useGetPostsQuery } from "@/redux/slice/auth.slice";
// import { NotFound } from "@/components/widgets";
// import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// import SkeletonPost from "@/components/widgets/Skeletion";
// import Skeleton from "@/components/widgets/Skeletion";

// const Home = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

//   const { data, isFetching, isError, error } = useGetPostsQuery({ page, limit: 5 });

//   useEffect(() => {
//     if (data && data.posts?.posts?.length > 0) {
//       setPosts((prevPosts) => [...prevPosts, ...data.posts.posts]);
//       setHasMore(data.posts.hasNextPage);
//       setIsLoadingMore(false);
//     }
//   }, [data]);

//   const loadMorePosts = () => {
//     if (hasMore && !isLoadingMore && !isFetching) {
//       setIsLoadingMore(true);
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const { loaderRef } = useInfiniteScroll(loadMorePosts, hasMore);

//   if (isError) {
//     const errorMessage =
//       error && typeof error === "object" && "data" in error
//         ? (error.data as { message: string }).message
//         : "Something went wrong!";
//     return <NotFound label={`Failed to load posts: ${errorMessage}`} />;
//   }

//   return (
//     <div className={styles["tweets-area"]}>
//     <CreateInput userProfileImage="https://via.placeholder.com/150" />

//    <Skeleton width='300px' height='40px' variant="circle" />
//   </div>
//   );
// };

// export default Home;


"use client"

import { useState } from "react"
import styles from "@/styles/components/tweetcard.module.scss"
import { TweetCard } from "@/components/common";
import CreateInput from "@/components/common/CreateInput";
 import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import TweetCardSkeleton from "@/components/widgets/CardSkeletion"
import { usePosts } from "@/hooks/use-post"

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

const Home = () => {
  const [page, setPage] = useState<number>(1)
  
  const { posts, isLoading, error, hasMore } = usePosts(page, 5)

  const loadMorePosts = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const { loaderRef } = useInfiniteScroll(loadMorePosts, hasMore)

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className={styles["tweets-area"]}>
      <CreateInput userProfileImage="https://via.placeholder.com/150" />
      {posts.map((post: Post) => (
      <TweetCard key={post._id} post={post} />
      ))}
      {isLoading && Array.from({ length: 3 }).map((_, index: number) => <TweetCardSkeleton key={index} />)}
      <div ref={loaderRef} />
    </div>
  )
}

export default Home

