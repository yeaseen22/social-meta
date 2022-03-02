import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import PostHead from '../commons/postHead';
import PostCard from '../commons/PostCard';
import SuggestedFollows from "../commons/SuggestedFollows";
import { connect } from 'react-redux';
import { readAllPosts } from '../../redux/actions/PostActions';
import NotFound from "../widgets/NotFound";
import FriendsBar from "../commons/FriendsBar";
import Footer from "../commons/Footer";

const notFoundColor = 'gray';

class Home extends React.Component{
    constructor(props) {
        super(props);
        // dispatched action here..
        this.props.dispatch(readAllPosts());
    }

    // show current User Posts
    showAllPosts = (Posts) => {
        if (Posts === null){
            return (
                    <NotFound
                        msg={"Post Not Found!"}
                        color={notFoundColor}
                        size={100}
                    />
            );
        }

        if (Posts.length < 1){
            return (
                    <NotFound
                        msg={"Post Not Found!"}
                        color={notFoundColor}
                        size={100}
                    />
            );
        }

        return Posts.length && Posts.map((post) => (
                <PostCard
                    key={post._id}
                    postType="HOME"
                    postId={post._id}
                    ownerId={post.ownerId}
                    postBody={post.body}
                    postImage={post.image}
                    createdAt={post.createdAt}
                />
        ));
    }

    render() {
        // console.log(this.props.Posts);

        return (
            <div>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <Paper>
                                <PostHead />
                            </Paper>
                        </Grid>

                        <Grid item xs={4} md={4} style={{ marginTop: '2rem' }}>
                            <FriendsBar />
                        </Grid>

                        {/*----- Showing all posts ----*/}
                        <Grid item xs={8} md={8}>
                            {this.showAllPosts(this.props.allPosts ? this.props.allPosts : null)}
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <SuggestedFollows />
                            <Footer />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

// mapStateToProps Function..
const mapStateToProps = (state) => {
    return {...state.Post};
};

export default connect(mapStateToProps)(Home);
