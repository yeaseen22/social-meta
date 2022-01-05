import React from 'react';
import { Grid, Paper } from '@mui/material';
import StylesModule from '../../css/postHead.module.css';

const PostHead = () => {
    const profilePath = "/profileUpload";

    return (
        <Paper>
            <Grid container>
                <Grid item xs={1}>
                    <img 
                        className={StylesModule.postProfilePic}
                        src={`${profilePath}/182301113_1188357921597376_6734590995638215452_n.jpg`} 
                        alt="profile-pic"
                    />
                </Grid>

                <Grid item xs={11}>
                    <input 
                        className={StylesModule.postInput}
                        type="text" 
                        placeholder="Create your post now.."
                        disabled={true}
                    /> 
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PostHead;