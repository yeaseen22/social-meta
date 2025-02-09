"use client";

import React from "react";
import styles from "@/styles/layouts/home-layout.module.scss";
import { TweetCard } from "@/components/common";
import CreateInput from "@/components/common/CreateInput";
import { useGetPostsQuery } from "@/redux/slice/auth.slice";
import { RootState, store } from "@/redux/store";
import { NotFound } from '@/components/widgets';

const Home = () => {
  const { data, isLoading, error } = useGetPostsQuery({ page: 1, limit: 5 });
  const state = store.getState() as RootState;
  console.log('auth', state.auth)

  // region loading
  if (isLoading) return <p>Loading posts...</p>;

  if (error) {
    const errorMessage = error && typeof error === 'object' && 'data' in error ? (error.data as { message: string }).message : "Something went wrong!";
    return <p>Failed to load posts: {errorMessage}</p>;
  }

  const posts = data?.posts?.posts || [];

  return (
    <>
      <div className={styles["tweets-area"]}>
        <CreateInput userProfileImage={"https://via.placeholder.com/150"} />
        {posts.length > 0 ? posts.map((post: any) => (
          <TweetCard key={post._id} post={post} />
        )) : (
          <div style={{ marginTop: '10rem' }}>
            {/* <Loading label="No feeds are available!" /> */}
            <NotFound label="No feeds are available!" />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
