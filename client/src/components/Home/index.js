import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import PostHead from '../widgets/postHead';

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
                        <Paper>
                            <h3>Suggested connections</h3>
                        </Paper>
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <Paper>
                            <h3>Post</h3>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Paper>
                            <h3>Post</h3>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Paper>
                            <h3>Post</h3>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;