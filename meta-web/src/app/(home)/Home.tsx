'use client';

import React from 'react';
import styles from '@/styles/layouts/home-layout.module.scss';
import { TweetCard } from '@/components/common';

const Home = () => {
    return (
        <div className={styles['tweets-area']}>
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
        </div>
    );
};

export default Home;
