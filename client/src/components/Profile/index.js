import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Paper } from '@mui/material';
import ProfileHead from './profileHead';
import PostHead from '../commons/postHead';
import PostCard from '../commons/PostCard';
import SuggestedFollows from "../commons/SuggestedFollows";

class Profile extends React.Component {

    // rendering method..
    render() {
        console.log(this.props);

        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={12}>
                        <ProfileHead />
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <PostHead />
                    </Grid>

                    <Grid item xs={6} md={4}>
                       <SuggestedFollows />
                    </Grid>

                    <Grid item xs={6} md={8}>
                       <PostCard />
                    </Grid>

                    <Grid item xs={6} md={8}>
                       <PostCard />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

// mapStateToProps Function..
const mapStateToProps = (state) => {
    return {
        User: state.User
    };
};

export default connect(mapStateToProps)(Profile);
