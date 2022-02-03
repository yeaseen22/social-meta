import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    ListItemIcon,
    Modal, Button
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    ExpandMore as ExpandMoreIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Report as ReportIcon,
    Send as SendIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { deletePost, updatePost } from '../../redux/actions/PostActions';
import { connect } from 'react-redux';
import {LoadingButton} from "@mui/lab";
import Uploader from "../widgets/Uploader";


// path for initialPath for image as post image..
const initialPostImgPath = "/postUpload";
const initialProfileImgPath = "/profileUpload";

// Styled..
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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


// Modal of Edit Post..
const EditModal = ({ editModal, setEditModal, currentUserInfo, selectedPostInfo, handleUpdate }) => {
    const [postData, setPostData] = React.useState({
        postBody: '',
        imageFile: '',
        imagePreview: '',
        loading: false
    });

    // useEffect Hook..
    React.useEffect(() => {
        setPostData({
            ...postData,
            postId: selectedPostInfo.postId,
            postBody: selectedPostInfo.postBody,
            imageFile: selectedPostInfo.postImage,
            imagePreview: `${initialPostImgPath}/${selectedPostInfo.postImage}`
        });

        // clean-up function..
        return () => {
            setPostData({
                postBody: '',
                imageFile: '',
                imagePreview: '',
                loading: false
            });
        }
    }, []);

    // Stylesheet for uploader component..
    const uploaderStyle = {
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        border: '1px solid lightgray',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    // To PostBody Input..
    const postBodyInputStyle = {
        width: '100%',
        minHeight: '50px',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        border: '1px solid lightgray',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px'
    };

    // Post Submit Button Or Loading after submit..
    const postSubmitButton = (isLoading) => (
        !isLoading ?
            <Button
                variant="contained"
                fullWidth={true}
                color="secondary"
                endIcon={<SendIcon />}
                onClick={(e) => handleUpdate(e, postData, setPostData)}
            >
                Update
            </Button>
            :
            <LoadingButton
                loading
                loadingPosition="start"
                variant="contained"
                fullWidth={true}
                startIcon={<SendIcon/>}
            >
                Update
            </LoadingButton>
    )


    // Returning statement..
    return (
        <Modal
            open={editModal}
            onClose={() => setEditModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={'No User'}
                            src={`${initialProfileImgPath}/${currentUserInfo.userProfilePhoto}`}
                        />
                    }
                    title={`${currentUserInfo.userFirstname} ${currentUserInfo.userLastname}`}
                    subheader={currentUserInfo.userTitle}
                />
                <CardContent>
                    <textarea
                        value={postData.postBody}
                        placeholder="Make Update from previous post.."
                        style={postBodyInputStyle}
                        onChange={(e) => {
                            setPostData({...postData, postBody: e.target.value})
                        }}
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

                    <div style={{marginTop: '0.5rem'}}>
                        <Button
                            variant="contained"
                            fullWidth={true}
                            color="error"
                            endIcon={<CancelIcon/>}
                            onClick={() => setEditModal(false)}
                        >
                            cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
};



// Main PostCard's Component..
const PostCard = (props) => {
    const { ownerId, postId, postBody, postImage, createdAt } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [userByOwner, setUserByOwner] = React.useState(null);
    const [editModal, setEditModal] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const optionOpen = Boolean(anchorEl);

    // React Router navigation..
    const navigate = useNavigate();

    const fetchUserByOwnerId = async(id) => {
            await axios.get(`/api/find_user?ownerId=${id}`)
            .then(response => {
                setUserByOwner(response.data);
            })
            .catch(err => console.log(`ERR! from when tried to get req. findUserByOwnerId ${err}`));
    };

    // useEffect hook..
    useEffect( () => {
        fetchUserByOwnerId(ownerId);

        // useEffect's cleanup function..
        return () => {
            setUserByOwner(null);
        };
    }, [ownerId]);

    // current loggedIn user's information..
    const currentUserInfo = {
        userFirstname: props && props.login ? props.login.firstname : "Loading...",
        userLastname: props && props.login ? props.login.lastname : "Loading..",
        userTitle: props && props.login ? props.login.title : "Loading..",
        userProfilePhoto: props && props.login ? props.login.profilePhoto : "Loading.."
    };

    // current post information..
    const currentSelectedPostInfo = {
        postId,
        ownerId,
        postBody,
        postImage,
        postCreatedAt: createdAt
    };

    // expandClick handle function..
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Handler functions for main modal open & close
    const handleOptionOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOptionClose = () => {
        setAnchorEl(null);
    };

    // to Delete Post..
    const clickToDeletePost = (event, postId) => {
        event.preventDefault();

        // Confirmation to delete or not..
        if (window.confirm("Are you sure want to delete?")){
            // make delete req. to server..
            props.dispatch(deletePost(postId));
            window.location.reload();
        }
    };

    // to Update Post..
    const handleUpdate = (event, postData, setPostData) => {
        event.preventDefault();
        setPostData({...postData, loading: true});

        // FormData Class to Object..
        const formData = new FormData();
        formData.append('_id', postData.postId);
        formData.append('body', postData.postBody);
        formData.append('file', postData.imageFile);

        // make dispatch to update post..
        props.dispatch(updatePost(formData));

        setTimeout(() => {
            setPostData({...postData, loading: false});
            // redirect to home..
            navigate('/');
        }, 2000);
    }

    // To rendering Post Menu as Profile Or Home View..
    const renderMenuBaseOnComponentType = (type) => {
        switch (type){
            case "HOME":
                return (
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={optionOpen}
                        onClose={handleOptionClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to={`/profile-others/${ownerId}`}>
                            <MenuItem onClick={handleOptionClose}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                View Profile
                            </MenuItem>
                        </Link>

                        <MenuItem onClick={handleOptionClose}>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            Report this post
                        </MenuItem>
                    </Menu>
                );

            case "PROFILE":
                return (
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={optionOpen}
                        onClose={handleOptionClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={(e) => setEditModal(true)}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            Edit
                        </MenuItem>

                        {/*---- EditModal here ----*/}
                        <EditModal
                            editModal={editModal}
                            setEditModal={setEditModal}
                            currentUserInfo={currentUserInfo}
                            selectedPostInfo={currentSelectedPostInfo}
                            handleUpdate={handleUpdate}
                        />

                        <MenuItem onClick={(e) => {handleOptionClose(e); clickToDeletePost(e, props.postId)}}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                );

            case "PROFILE_OTHERS":
                return (
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={optionOpen}
                        onClose={handleOptionClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleOptionClose}>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            Report this post
                        </MenuItem>
                    </Menu>
                );

            default:
                return null;
        }
    };

    // showing profile firstname lastname or profile photo of userByOwnerId..
    const showNameOrProfileOrTitle = (type) => {
        switch (type){
            case "NAME":
                if (userByOwner === null){
                    return "Loading...";
                }
                return `${userByOwner.foundUser.firstname} ${userByOwner.foundUser.lastname}`;

            case "PROFILE":
                if (userByOwner === null){
                    return "Loading...";
                }
                return `${userByOwner.foundUser.profilePhoto}`;

            case "TITLE":
                if (userByOwner === null){
                    return "Loading...";
                }
                return `${userByOwner.foundUser.title}`;

            default:
                return "Not Found!";
        }
    };

    // Returning statement..
    return (
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={'No User'}
                        src={`${initialProfileImgPath}/${showNameOrProfileOrTitle("PROFILE")}`}
                    />
                }
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleOptionOpen}>
                            <MoreVertIcon />
                        </IconButton>

                        {renderMenuBaseOnComponentType(props.postType)}
                    </>
                }
                title={showNameOrProfileOrTitle('NAME')}
                subheader={showNameOrProfileOrTitle('TITLE')}
            />

            {/*---- Post Image here -----*/}
            <CardMedia
                component="img"
                height="500"
                image={`${initialPostImgPath}/${postImage}`}
                alt="Paella dish"
            />

            {/*---- Post Body here ----*/}
            <CardContent>
                <Typography variant="body2" color="text.primary"
                            dangerouslySetInnerHTML={{
                                __html: postBody
                            } }
                />
                <Typography variant="body2" color="text.secondary">
                    Created at: {createdAt}
                </Typography>
            </CardContent>

            {/*---- ExpandMore button and for dropdown here ----*/}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            {/*---- Collapse Area Section ----*/}
            {/*---- It will be the future Comments section ----*/}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

// mapStateToProps..
const mapStateToProps = (state) => {
    return {...state.Post, ...state.User};
};

export default connect(mapStateToProps)(PostCard);
