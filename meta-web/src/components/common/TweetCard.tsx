'use client';
import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '@/styles/components/tweetcard.module.scss';

export default function TweetCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <div className={styles['tweet-card-wrapper']}>
            <Card className={styles['tweet-card']}>
                {/* HEADER */}
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                    action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />

                {/* MEDIA */}
                <CardMedia
                    component="img"
                    height="194"
                    image="https://www.stuff.tv/wp-content/uploads/sites/2/2024/09/meta-ai.jpg?w=1080"
                    alt="Paella dish"
                />

                {/* CONTENT */}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>

                {/* ACTIONS */}
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
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
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
