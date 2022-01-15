import React from 'react';
import { Grid, Paper } from '@mui/material';
import StylesModule from '../../css/profileHead.module.css';

// profile head compoennts here..
const ProfileHead = () => {
    const profilePath = "/profileUpload";
    const coverPath = "/coverUpload";

    // returning statement..
    return (
        <Paper className={StylesModule.paper}>
            <div className={StylesModule.cover}>
                <img
                    src={`${coverPath}/demoCover.jpeg`}
                    alt=""
                    className={StylesModule.coverPic}
                />
                
            </div>
            <div className={StylesModule.profile}>
                <img
                    src={`${profilePath}/182301113_1188357921597376_6734590995638215452_n.jpg`}
                    alt="profilePhoto"
                    className={StylesModule.profilePic}
                />

                <Grid container spacing={2}>
                    <Grid item xs={8} className={StylesModule.profileInfoText1}>
                        <h1>
                            <span>Asad Anik</span>
                            <span>(Software Engineer)</span>
                        </h1>
                        <p>I am professional boy and i love to coding.</p>
                    </Grid>

                    <Grid item xs={4} className={StylesModule.profileInfoText2}>
                        <p>
                            <span>s.engineer63@gmail.com</span>
                        </p>
                        <p className={StylesModule.followText}>
                            <span>11,37,899 followers</span>
                            <span> - </span>
                            <span>0 following</span>
                        </p>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default ProfileHead;