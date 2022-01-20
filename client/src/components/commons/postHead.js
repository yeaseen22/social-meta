import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Modal,
    Typography,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    Card
} from '@mui/material';
import StylesModule from '../../css/postHead.module.css';
import {red} from "@mui/material/colors";

// Global style for Modal..
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const initialPostImgPath = "/postUpload";

// Modal Component..
const PostModal = ({ postModal, setPostModal }) => {
    // Returning statement..
    return (
        <Modal
            open={postModal}
            onClose={() => setPostModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <Card sx={style}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        title="Asad Anik"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="500"
                        image={`${initialPostImgPath}/demoPostImg.jpg`}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>
        </Modal>
    );
};

// Post Head Component..
const PostHead = () => {
    const profilePath = "/profileUpload";
    const [postModal, setPostModal] = useState(false);

    const paperStyle = {
        padding: '10px',
        backgroundColor: 'rgb(25 118 209)',
        marginTop: '1rem'
    };

    // Returning statement..
    return (
        <Paper
            elevation={2}
            style={paperStyle}
        >
            <Grid container>
                <Grid item xs={1}>
                    <img
                        className={StylesModule.postProfilePic}
                        src={`${profilePath}/182301113_1188357921597376_6734590995638215452_n.jpg`}
                        alt="profile-pic"
                    />
                </Grid>

                <Grid item xs={11}>
                    <div onClick={() => setPostModal(true)}>
                        <input
                            className={StylesModule.postInput}
                            type="text"
                            placeholder="Create your post now.."
                            disabled={true}
                        />
                    </div>

                    <PostModal postModal={postModal} setPostModal={setPostModal} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PostHead;
