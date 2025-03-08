import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useAddCommentMutation } from '@/redux/slice/comment.slice';
import useSocket from '@/hooks/useSocket';

interface CommentSectionProps {
    postId: string;
    initialComments: any[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [addComment] = useAddCommentMutation();

    // Use the custom hook to listen for new comments
    const socket = useSocket("notification", (newCommentData) => {
        if (newCommentData.type === "comment" && newCommentData.postId === postId) {
          setComments((prevComments) => [...prevComments, newCommentData.comment]);
        }
      });
      

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    // Sync initial comments
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    // Handle adding a new comment
    const handleAddComment = async () => {
      if (newComment.trim()) {
        try {
          const response = await addComment({
            postId,
            commment: newComment, // Changed `comment` to `commment`
          }).unwrap();
  
          console.log("API Response:", response);
  
          if (response) {
            setComments((prev) => [...prev, response]);
          } else {
            console.error("Error: No response received");
          }
  
          setNewComment("");
        } catch (err) {
          console.error("Error adding comment:", err);
        }
      }
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            <Typography paragraph>Comments</Typography>
            <List>
                {Array.isArray(comments) && comments.map((comment, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={comment.text} secondary={comment.user} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    fullWidth
                    label="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddComment}>
                    Comment
                </Button>
            </Box>
        </Box>
    );
};

export default CommentSection;
