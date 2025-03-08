"use client";
import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/slice/notificationSlice";
import { socket } from "@/lib/socket";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("notification", (data) => {
        setMessage(data.message);
        setOpen(true);
        dispatch(addNotification(data));
    });

    return () => {
        socket.off("notification");
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
