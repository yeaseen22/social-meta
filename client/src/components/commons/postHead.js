import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Modal,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    Card,
    Button,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import StylesModule from '../../css/postHead.module.css';
import {red} from "@mui/material/colors";
import TextEditor from '../widgets/TextEditor';
import Uploader from '../widgets/Uploader';


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

// const initialPostImgPath = "/postUpload";

// Modal Component..
const PostModal = ({ postModal, setPostModal }) => {
    const [postData, setPostData] = React.useState({ postBody: ''});
    const [loading, setLoading] = useState(false);

    const uploaderStyle = {
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    };

    // Submit Post..
    const clickToSubmit = () => {
        alert('Clicked for submit me! check console into browser');
        console.log(postData);
    };

    // Post Submit Button Or Loading after submit..
    const postSubmitButton = (isLoading) => (
        !isLoading ?
            <Button
                variant="contained"
                fullWidth={true}
                color="secondary"
                endIcon={<SendIcon />}
                onClick={clickToSubmit}
            >
                post
            </Button>
            :
            <LoadingButton
                loading
                loadingPosition="start"
                variant="contained"
                fullWidth={true}
                startIcon={<SendIcon/>}
            >
                post
            </LoadingButton>
    )


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
                    <CardContent>
                        <TextEditor
                            setValue={setPostData}
                            editorPlaceholder="Write your post here..."
                            type="postBody"
                            value={postData.postBody}
                        />
                        <Uploader customStyle={uploaderStyle} />
                        {/*<CardMedia*/}
                        {/*    mx={3}*/}
                        {/*    component="img"*/}
                        {/*    height="300"*/}
                        {/*    image={`${initialPostImgPath}/demoPostImg.jpg`}*/}
                        {/*    alt="Paella dish"*/}
                        {/*/>*/}

                        {/*---- Post-Submit button or loading ----*/}
                        <div style={{marginTop: '0.5rem'}}>
                            {postSubmitButton(loading)}
                        </div>
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

                    <PostModal
                        postModal={postModal}
                        setPostModal={setPostModal}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PostHead;
