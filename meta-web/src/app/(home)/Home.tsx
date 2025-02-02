"use client";

import React from "react";
import styles from "@/styles/layouts/home-layout.module.scss";
import { TweetCard } from "@/components/common";
import CustomizedInputBase from "@/components/common/CreateInput";

const Home = () => {
  return (
    <>
      <div className={styles["tweets-area"]}>
      <CustomizedInputBase userProfileImage="https://via.placeholder.com/150" />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
      </div>
    </>
  );
};

export default Home;
