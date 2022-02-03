import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from '@mui/material';
import ProfileHead from '../commons/profileHead';
import { postsByUserId } from '../../redux/actions/PostActions';
import { useParams } from 'react-router-dom';
import NotFound from "../widgets/NotFound";
import PostCard from "../commons/PostCard";

const notFoundColor = 'gray';

const ProfileOthers = (props) => {
    const { userId } = useParams();

    useEffect(() => {
        // dispatch for Posts by UserId..
        props.dispatch(postsByUserId(userId));
    }, []);

    // show current User Posts
    const showPostsByUserId = (Posts) => {
        if (Posts === null){
            return (
                <Grid item xs={6} md={8}>
                    <NotFound
                        msg={"No Post!"}
                        color={notFoundColor}
                        size={100}
                    />
                </Grid>
            );
        }

        if (Posts.length < 1){
            return (
                <Grid item xs={6} md={8}>
                    <NotFound
                        msg={"No Post!"}
                        color={notFoundColor}
                        size={100}
                    />
                </Grid>
            );
        }

        return Posts.length && Posts.map((post) => (
            <Grid key={post._id} item xs={6} md={8}>
                <PostCard
                    postType="PROFILE_OTHERS"
                    postId={post._id}
                    ownerId={post.ownerId}
                    postBody={post.body}
                    postImage={post.image}
                    createdAt={post.createdAt}
                />
            </Grid>
        ));
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {/*---- Profile Head showing here ----*/}
                <Grid item xs={8} md={12}>
                    <ProfileHead />
                </Grid>

                {/*----- Showing current user posts ----*/}
                {showPostsByUserId(props.postsByUserId ? props.postsByUserId : null)}

                {/*---- BirthDate Section ----*/}
                <Grid item xs={2} md={4}>
                    <div>
                        <h3>Birthdate here.</h3>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

// mapStateToProps Function..
const mapStateToProps = (state) => {
    return {...state.Post};
};

export default connect(mapStateToProps)(ProfileOthers);
