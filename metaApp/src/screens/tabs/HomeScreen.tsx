import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { PostCard } from '../../components/widgets';
import { InstaStoryUI } from '../../components/ui';
import { Container } from '../../styles/FeedStyles';
import { useGetAllPostsQuery } from '../../redux/slice/post.slice';

const LIMIT = 5;

const HomeTabScreen = () => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, isFetching, refetch } = useGetAllPostsQuery({ page, limit: LIMIT });
    console.log('data:', data);

    // Extract posts safely, handle empty data
    useEffect(() => {
        if (data?.posts?.posts?.length > 0) {
            const transformedPosts = data.posts.posts.map(transformPost);
            if (page === 1) {
                setPosts(transformedPosts);
            } else {
                setPosts(prev => [...prev, ...transformedPosts]);
            }
        } else if (page === 1) {
            setPosts([]);
        }
    }, [data, page]);


    const onRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await refetch();
        setRefreshing(false);
    };

    const transformPost = (post: any) => {
        if (!post.owner) {
            console.warn(`Post ${post._id} missing owner`);
        }
        const owner = post.owner || {};
        return {
            _id: post._id,
            userName: `${owner.firstname || 'Unknown'} ${owner.lastname || ''}`.trim(),
            userImg: owner.profilePhoto ? { uri: owner.profilePhoto } : require('../../assets/images/avatar-male.png'),
            postTime: post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown date',
            post: post.content || '',
            postImg: null,
            liked: false,
            likes: post.likes_count || 0,
            comments: post.comments_count || 0,
        };
    };


    // Detect scroll to bottom for pagination
    const handleScrollEnd = useCallback(({ nativeEvent }: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isBottomReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isBottomReached && !isFetching && !isLoading) {
            setPage(prev => prev + 1);
        }
    }, [isFetching, isLoading]);




    // Helper function to render posts list (like your old renderPostData)
    const renderPostData = (data: any[]) => {
        return data.map(post => (
            <PostCard key={post._id} item={post} />
        ));
    };



    return (
        <Container>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onMomentumScrollEnd={handleScrollEnd}
                showsVerticalScrollIndicator={false}
            >
                <InstaStoryUI />

                {posts.length === 0 && !isLoading && (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No posts found.</Text>
                )}

                {renderPostData(posts)}

                {isFetching && page > 1 && (
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>Loading more...</Text>
                )}
            </ScrollView>
        </Container>
    );
};

export default HomeTabScreen;
