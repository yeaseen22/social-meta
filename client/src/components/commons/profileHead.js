import React from 'react';
import { Grid, Paper, Avatar } from '@mui/material';
import StylesModule from '../../css/profileHead.module.css';
import { connect } from "react-redux";

// profile head component here..
const ProfileHead = (props) => {
    const profilePath = "/profileUpload";
    const coverPath = "/coverUpload";

    // ThemeMode..
    const { backgroundColor, textColor, cardBorder } = props.Settings.themeMode;

    // returning statement..
    return (
        <Paper className={StylesModule.paper} style={{ background: backgroundColor, border: cardBorder }}>
            <div className={StylesModule.cover}>
                <img
                    src={`${coverPath}/demoCover.jpeg`}
                    alt=""
                    className={StylesModule.coverPic}
                />

            </div>
            <div className={StylesModule.profile}>
                {/*<img*/}
                {/*    src={`${profilePath}/${props.profilePhoto}`}*/}
                {/*    alt="profilePhoto"*/}
                {/*    className={StylesModule.profilePic}*/}
                {/*/>*/}
                <Avatar
                    src={`${profilePath}/${props.profilePhoto}`}
                    alt="profilePhoto"
                    className={StylesModule.profilePic}
                    style={{ height: '150px', width: '150px' }}
                />

                <Grid container spacing={2}>
                    <Grid item xs={8} className={StylesModule.profileInfoText1} style={{ color: textColor }}>
                        <h1>
                            <span>{props.firstname} {props.lastname}</span>
                            <span>({props.title})</span>
                        </h1>
                        <p>{props.bio}</p>
                    </Grid>

                    <Grid item xs={4} className={StylesModule.profileInfoText2} style={{ color: textColor }}>
                        <p>
                            <span>{props.email}</span>
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

// mapStateToProps..
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings
    };
};

export default connect(mapStateToProps)(ProfileHead);
