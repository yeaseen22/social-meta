"use client";
import React, { useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Badge
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addNotification, markAsRead, deleteNotification } from "@/redux/slice/notificationSlice";
import { socket } from "@/lib/socket";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  useEffect(() => {
    socket.on("notification", (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off("notification");
    };
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteNotification(id));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem className={notification.read ? "read" : ""} onClick={() => dispatch(markAsRead(notification.id))}>
                <ListItemAvatar>
                  <Badge color="primary" variant="dot" invisible={notification.read}>
                    <Avatar>
                      <NotificationsIcon />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={`${notification.content} • ${new Date(notification.timestamp).toLocaleString()}`}
                />
                <IconButton edge="end" onClick={() => handleDelete(notification.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1">No notifications available</Typography>
        )}
      </List>
    </Container>
  );
}
