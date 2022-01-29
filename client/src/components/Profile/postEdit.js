import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { updatePost, readPost } from '../../redux/actions/PostActions';
import { connect } from 'react-redux';
import {Button, Grid, Paper, Typography} from '@mui/material';
import TextEditor from "../widgets/TextEditor";
import Uploader from "../widgets/Uploader";
import {Send as SendIcon} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// Component..
const PostEdit = (props) => {
    // React Router v6 params to props get.
    const params = useParams();
    const [postData, setPostData] = useState({
        postBody: '',
        imageFile: '',
        imagePreview: '',
        loading: false
    });

    // useEffect Hook..
    useEffect(() => {
        props.dispatch(readPost(params.postId));
    }, []);

    const uploaderStyle = {
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        border: '1px solid lightgray',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const postSubmitButton = (isLoading) => (
        !isLoading ?
            <Button
                variant="contained"
                fullWidth={true}
                color="success"
                endIcon={<SendIcon />}
                onClick={(event) => clickToUpdate(event)}
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


    const syncDataToForm = () => {
        if (props.readPost){
            if (props.readPost.post.success){
                setPostData({
                    ...postData,
                    postBody: props.readPost.post.body,
                    imageFile: props.readPost.post.image,
                });
            }
        }
    };

    console.log(postData);

    const clickToUpdate = (event) => {
        event.preventDefault();
    };


    return (
       <>
           {syncDataToForm()}
           <Typography fontSize={"large"}>Update Post!</Typography>

           <Paper>
               <Grid container style={{padding: '1rem'}}>
                   <Grid item xs={8} md={12}>
                       <TextEditor
                           postData={postData}
                           setPostData={setPostData}
                           editorPlaceholder={"Update your post here..."}
                           type="postBody"
                       />
                   </Grid>

                   <Grid item xs={8} md={12}>
                       <Uploader
                           customStyle={uploaderStyle}
                           postData={postData}
                           setPostData={setPostData}
                       />
                   </Grid>

                   <Grid item xs={8} md={12}>
                       {/*---- Post-Submit button or loading ----*/}
                       <div style={{marginTop: '0.5rem'}}>
                           {postSubmitButton(postData.loading)}
                       </div>
                   </Grid>
               </Grid>
           </Paper>
       </>
    );
};

// mapStateToProps..
const mapStateToProps = (state) => {
    return {...state.Post};
};

export default connect(mapStateToProps)(PostEdit);
