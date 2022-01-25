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
    Typography
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    ExpandMore as ExpandMoreIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { connect } from 'react-redux';
import { findUserByOwnerId } from '../../redux/actions/UserActions';

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

// Main PostCard's Component..
const PostCard = (props) => {
    const { ownerId, postBody, postImage, createdAt, updateAt } = props;
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        // dispatched for userByOwnerId..
        props.dispatch(findUserByOwnerId(ownerId));
    }, ['']);

    // console.log('PostCard redux store == ',props);

    // expandClick handle function..
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Owner's Firstname & Lastname here..
    const ownerFirstAndLastName = props.User && `${props.User.foundUser.firstname} ${props.User.foundUser.lastname}`;
    const ownerProfilePhoto = props.User && `${props.User.foundUser.profilePhoto}`;

    // Returning statement..
    return (
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={ownerFirstAndLastName}
                        src={`${initialProfileImgPath}/${ownerProfilePhoto}`}
                    />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={ownerFirstAndLastName}
                subheader={createdAt}
            />
            <CardMedia
                component="img"
                height="500"
                image={`${initialPostImgPath}/${postImage}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {postBody}
                </Typography>
            </CardContent>
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
    return { ...state.User };
};

export default connect(mapStateToProps)(PostCard);
