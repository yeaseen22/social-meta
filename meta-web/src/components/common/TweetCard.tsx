'use client';
import React, { ReactNode } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '@/styles/components/tweetcard.module.scss';

interface TweetCardProps {
    post: {
        body: string;
        _id: string;
        createdAt: string;
        likes_count: number;
        comments_count: number;
        owner: {
            firstname: string;
            lastname: string;
            profilePhoto?: string;
            title: string;
        };
    };
}

export default function TweetCard({ post }: TweetCardProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => setExpanded(!expanded);
    // console.log(post.owner.firstname);

    return (
        <div className={styles['tweet-card-wrapper']}>
            {/* <div style={{ marginTop: '60px' }}> */}
            <Card className={styles['tweet-card']}>
                {/* HEADER */}
                <CardHeader
                    avatar={<Avatar
                        src={post?.owner?.profilePhoto || ''}
                        sx={{ bgcolor: red[500] }}
                    >
                        {post?.owner?.firstname || ''}
                    </Avatar>}
                    action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                    title={`${post?.owner?.firstname} ${post?.owner?.lastname}  || ${post?.owner?.title}`}
                    subheader={new Date(post?.createdAt).toDateString()}

                />

                {/* MEDIA */}
                <CardMedia
                    component="img"
                    height="194"
                    image={
                        post.owner?.profilePhoto === "avatar" || !post.owner?.profilePhoto?.trim()
                            ? "https://www.stuff.tv/wp-content/uploads/sites/2/2024/09/meta-ai.jpg?w=1080"
                            : post.owner.profilePhoto
                    }
                    alt={post?.owner?.title || "Default Image"}
                />



                {/* CONTENT */}
                <CardContent>
                    <Typography variant="h6" color="text.primary">
                        {post?.owner?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post?.body}
                    </Typography>
                </CardContent>

                {/* ACTIONS */}
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <Typography>{post.likes_count} Likes</Typography>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <Typography>{post?.comments_count} Comments</Typography>
                    <IconButton
                        className={styles['expand-button']}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                {/* COLLAPSIBLE SECTION */}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>Post created on: {new Date(post?.createdAt).toLocaleDateString()}</Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            {/* </div> */}
        </div>
    );
}
