import React from 'react';
import { Button, Paper, Grid } from '@mui/material';
import StylesModule from '../../css/RegisterUserExist.module.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';

const RegisterUserExist = (props) => {

    if (props.User.register) {
        const { success, message, user } = props.User.register;
        const {firstname, lastname, email, bio, profilePhoto} = user[0];

        const renderProfilePic = (profilePic) => {
            if (profilePic === 'avatar'){
                return <AccountCircleSharpIcon fontSize={'large'} />;
            }else{
                return (
                    <img src={`profileUpload/${profilePhoto}`} alt="no-avatar else" />
                );
            }
        };

        if (!success) {
            return (
                <React.Fragment>
                    <Paper className={StylesModule.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} />
                            <Grid item>
                                <h3>{message}</h3>
                                <p>With this previous user.</p>
                            </Grid>
                            <Grid item xs={4} />
                        </Grid>

                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs={4} />
                            <Grid item>
                                <Paper className={StylesModule.paper}>
                                    <div className={StylesModule.cicleProfile}>
                                        {renderProfilePic(profilePhoto)}
                                    </div>

                                    <div className={StylesModule.profileDetails}>
                                        <h3>
                                            <span>{firstname}</span>
                                            <span>{" "}</span>
                                            <span>{lastname}</span>
                                        </h3>
                                        <p>{bio}</p>
                                        <h6>{email}</h6>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} />
                        </Grid>

                        <Grid container wrap="nowrap" spacing={2} my={1}>
                            <Grid item xs={4} />
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<ArrowBackIosSharpIcon />}
                                    onClick={() => window.location.reload()}
                                >
                                    go back & try again
                                </Button>
                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Paper>
                </React.Fragment>
            );
        }
    }
};

export default RegisterUserExist;