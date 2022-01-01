import React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Container } from '@mui/material';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    // rendering method..
    render() {

        console.log(this.props);

        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={12}>
                        <Paper>
                            <h3>Profile</h3>
                        </Paper>
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