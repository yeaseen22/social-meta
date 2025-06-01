"use client";
import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/slice/notificationSlice";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNotification = (notification: { title: string; content: string }) => {
      console.log("🔊 Real-time Notification:", notification);
      
      // Assign a unique ID
      const enrichedNotification = {
        ...notification,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      dispatch(addNotification(enrichedNotification));
      setMessage(`${notification.title}: ${notification.content}`);
      setOpen(true);
    };

    // Ensure event listener is added only once
    if (!socket.hasListeners("notification")) {
      socket.on("notification", handleNotification);
    }

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [dispatch]);

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="info">
        {message}
      </Alert>
    </Snackbar>
  );
}
