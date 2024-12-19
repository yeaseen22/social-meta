import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Avatar, TextField, Button } from '@mui/material';
import { PenLine, Send, Smile } from "lucide-react";


const ChattingArea = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [messagesCollection, setMessagesCollection] = useState([]);
    const [myMessage, setMyMessage] = useState('');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleMyMessageSet = (value) => {
        setMyMessage(value);
    };

    const onEnterSendMessage = (event) => {
        if (event.key === 'Enter') {
            const placeholderMessagesCollection = [...messagesCollection];
            placeholderMessagesCollection.push(myMessage);
            setMessagesCollection(placeholderMessagesCollection);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h6">Group Chat</Typography>
            </Box>

            {/* Chat Content */}
            <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                {/* Tabs */}
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="chat tabs">
                    <Tab label="Messages" />
                    <Tab label="Participants" />
                </Tabs>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <Box
                        mt={2}
                        sx={{
                            maxHeight: "calc(100vh - 200px)",
                            overflowY: "auto",
                        }}
                    >
                        {/* Example Chat Messages */}
                        <Box display="flex" gap={2} mb={2}>
                            <Avatar>KJ</Avatar>
                            <Box>
                                <Typography variant="subtitle2">Kate Johnson</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    11:24 AM
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ backgroundColor: "#fff", p: 1, borderRadius: 2, mt: 1 }}
                                >
                                    Hi everyone, let's start the call soon 👋
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2" color="textSecondary">
                            Participants list would go here
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Chat Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
                <Box display="flex" gap={1} alignItems="center">
                    <TextField
                        placeholder="Write your message..."
                        fullWidth
                        size="small"
                    />
                    <Button variant="contained" color="primary">
                        <Smile size={16} />
                    </Button>
                    <Button variant="contained" color="primary">
                        <Send size={16} />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ChattingArea; 