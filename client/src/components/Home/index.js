import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import PostHead from '../commons/postHead';
import PostCard from '../commons/PostCard';
import SuggestedFollows from "../commons/SuggestedFollows";

const Home = () => {
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Paper>
                            <PostHead />
                        </Paper>
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
                    <Grid item xs={6} md={8}>
                        <PostCard />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
