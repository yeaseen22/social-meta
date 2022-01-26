import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Modal,
    CardHeader,
    Avatar,
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
import { connect } from 'react-redux';
import { postCreate } from '../../redux/actions/PostActions';
import AlertNotify from "../widgets/AlertNotify";
import { useNavigate } from 'react-router-dom';


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

// Modal Component..
const PostModal = ({ postModal, setPostModal, clickToSubmit }) => {
    const [postData, setPostData] = React.useState({
        postBody: '',
        imageFile: '',
        imagePreview: '',
        loading: false
    });

    const uploaderStyle = {
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        border: '1px solid lightgray',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    // Post Submit Button Or Loading after submit..
    const postSubmitButton = (isLoading) => (
        !isLoading ?
            <Button
                variant="contained"
                fullWidth={true}
                color="secondary"
                endIcon={<SendIcon />}
                onClick={(event) => clickToSubmit(event, postData, setPostData)}
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
                            postData={postData}
                            setPostData={setPostData}
                            editorPlaceholder="Write your post here..."
                            type="postBody"
                        />
                        <Uploader
                            customStyle={uploaderStyle}
                            postData={postData}
                            setPostData={setPostData}
                        />

                        {/*---- Post-Submit button or loading ----*/}
                        <div style={{marginTop: '0.5rem'}}>
                            {postSubmitButton(postData.loading)}
                        </div>
                    </CardContent>
                </Card>
        </Modal>
    );
};

// Post Head Component..
const PostHead = (props) => {
    const profilePath = "/profileUpload";
    const [postModal, setPostModal] = useState(false);

    // React-Router-Dom Navigate..
    const navigate = useNavigate();

    const paperStyle = {
        padding: '10px',
        backgroundColor: 'rgb(25 118 209)',
        marginTop: '1rem'
    };

    // Submit Post..
    const clickToSubmit = (event, postData, setPostData) => {
        event.preventDefault();

        setPostData({...postData, loading: true});

        const formData = new FormData();
        formData.append('body', postData.postBody);
        formData.append('file', postData.imageFile);

        // dispatching data to redux store for backend req.
        props.dispatch(postCreate(formData));

        setTimeout(() => {
            setPostData({...postData, loading: false});
            setPostModal(false);
        }, 2000);
    };

    // console.log('Connnected with redux store and showing props -->> ', props);

    if (props.Post){
        if (props.Post.createdPost){
            const { success } = props.Post.createdPost;

            if (!success) {
                return (
                    <div style={{marginTop: '1rem'}}>
                        <AlertNotify type="ERROR" message="Server ERROR! reload app & try again." />
                    </div>
                );
            }

            if (success) {
                // Redirect Home after make Post..
                setTimeout(() => {
                    // redirecting for home route..
                    navigate('/');
                }, 3000);
            }
        }
    }

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
                        clickToSubmit={clickToSubmit}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

// mapStateToProps function..
const mapStateToProps = (state) => {
    return {
        Post: state.Post
    };
};

export default connect(mapStateToProps)(PostHead);
