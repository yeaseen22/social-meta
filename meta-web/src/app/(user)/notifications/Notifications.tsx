'use client';
import React from 'react';
import { Box, Container, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Typography, Divider, Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';

const notifications = [
    { id: 1, title: 'New comment on your post', content: 'John commented: "Great post!"', timestamp: '2 hours ago', read: false },
    { id: 2, title: 'New follower', content: 'Jane Doe started following you.', timestamp: '1 day ago', read: true },
    { id: 3, title: 'Mention in a post', content: 'Sarah mentioned you in a post.', timestamp: '2 days ago', read: false },
];

export default function NotificationsPage() {
    return (
        <Container maxWidth="sm" className='notificationContainer'>
            <Typography variant="h4" className='heading'>
                Notifications
            </Typography>
            <List className='notificationList'>
                {notifications.map((notification) => (
                    <React.Fragment key={notification.id}>
                        <ListItem
                            className={`${'notificationItem'} ${notification.read ? 'read' : ''}`}
                        >
                            <ListItemAvatar>
                                <Badge
                                    color="primary"
                                    variant="dot"
                                    invisible={notification.read}
                                >
                                    <Avatar>
                                        <NotificationsIcon />
                                    </Avatar>
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={notification.title}
                                secondary={`${notification.content} • ${notification.timestamp}`}
                            />
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );
}
