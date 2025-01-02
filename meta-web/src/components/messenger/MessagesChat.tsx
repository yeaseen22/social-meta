'use client';
import '@/styles/messenger/messenger.module.scss';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { Paper, Typography, Avatar, Box, InputBase, IconButton, CircularProgress } from '@mui/material';
import { MessageBox } from "react-chat-elements";
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ModeSwitch } from '../widgets';

const MessagesChat = () => {
    const { mode } = useColorScheme();
    const themeClass = mode === 'dark' ? 'dark-theme' : 'light-theme';
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [messageList, setMessageList] = useState([
        {
            id: '1',
            title: "Burhan",
            type: "text",
            text: "Hi there !",
            date: new Date(),
            focus: false,
            titleColor: "#000",
            forwarded: false,
            replyButton: false,
            removeButton: false,
            retracted: false,
            notch: true,
            status: 'sent',
            position: 'left',
        },
        {
            id: 2,
            title: "Asad",
            type: "text",
            text: "Hi, how are you?",
            date: new Date(),
            focus: false,
            titleColor: "#000",
            forwarded: false,
            replyButton: false,
            removeButton: false,
            retracted: false,
            notch: true,
            status: 'waiting',
            position: 'right',
        },
        {
            id: 3,
            title: "Burhan",
            type: "text",
            text: "Hi there !",
            date: new Date(),
            focus: false,
            titleColor: "#000",
            forwarded: false,
            replyButton: false,
            removeButton: false,
            retracted: false,
            notch: true,
            status: 'read',
            position: 'left',
        },
        {
            id: 4,
            title: "Asad",
            type: "text",
            text: "Hi, how are you?",
            date: new Date(),
            focus: false,
            titleColor: "#000",
            forwarded: false,
            replyButton: false,
            removeButton: false,
            retracted: false,
            notch: true,
            status: 'received',
            position: 'right',
        }
    ]);



    // Function to refresh the chat list
    const refreshChatList = async () => {
        setIsRefreshing(true);
        // Simulate API call delay
        setTimeout(() => {
            // Add a new dummy chat item
            setMessageList((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    title: "Burhan",
                    type: "text",
                    text: "Hi, how are you?",
                    date: new Date(),
                    focus: false,
                    titleColor: "#000",
                    forwarded: false,
                    replyButton: false,
                    removeButton: false,
                    retracted: false,
                    notch: true,
                    status: 'waiting',
                    position: 'left',
                },
            ]);
            setIsRefreshing(false);
        }, 1500);
    };



    return (
        <Paper
            elevation={3}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top section */}
            <Box
                sx={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: `1px solid ${themeClass === 'dark-theme' ? '#444' : '#ddd'}`,
                }}
            >
                <Avatar
                    alt="User Avatar"
                    src="https://avatars.githubusercontent.com/u/80540635?v=4"
                    sx={{ marginRight: '16px' }}
                />
                <Typography variant="h6">Burhan</Typography>


                {/* Mode Theme Switch */}
                <Box sx={{ marginLeft: 'auto' }}>
                    <ModeSwitch />
                </Box>
            </Box>

            {/* Messages section */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    height: 'calc(100vh - 145px)', // Adjust height to leave space for header
                    padding: '16px',
                    background: themeClass === 'dark-theme' ? '#1a1a1a' : '#f5f5f5',
                }}
            >

                {/* Render messages */}
                {
                    messageList.map((message: any) => (
                        <MessageBox
                            key={message.id}
                            id={message.id}
                            position={message.position}
                            title={message.title}
                            type={message.type}
                            text={message.text}
                            date={message.date}
                            focus={message.focus}
                            titleColor={message.titleColor}
                            forwarded={message.forwarded}
                            replyButton={message.replyButton}
                            removeButton={message.removeButton}
                            retracted={message.retracted}
                            notch={message.notch}
                            status={message?.status}
                        />
                    ))
                }

                {/* Demo Message Design */}
                <MessageBox
                    id={1}
                    position="left"
                    title="Burhan"
                    type="text"
                    text="Hi there !"
                    date={new Date()}
                    focus={false}
                    titleColor="#000"
                    forwarded={false}
                    replyButton={false}
                    removeButton={false}
                    retracted={false}
                    notch={true}
                    status='read'
                />
                {/* More messages as needed */}

                {/* Show loader while refreshing */}
                {isRefreshing && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Box>

            {/* Input section */}
            <Box
                sx={{
                    padding: '8px 16px',
                    borderTop: `1px solid ${themeClass === 'dark-theme' ? '#444' : '#ddd'}`,
                    display: 'flex',
                    alignItems: 'center',
                    background: themeClass === 'dark-theme' ? '#2a2a2a' : '#fff',
                }}
            >
                {/* Desktop Refresh Button */}
                <IconButton
                    onClick={refreshChatList}
                    disabled={isRefreshing} // Disable while refreshing
                    color="primary"
                    aria-label="refresh"
                >
                    <RefreshIcon />
                </IconButton>

                {/* Message Input */}
                <InputBase
                    placeholder="Type your message..."
                    fullWidth
                    multiline
                    sx={{
                        flex: 1,
                        marginRight: '8px',
                        padding: '8px',
                        borderRadius: '8px',
                        background: themeClass === 'dark-theme' ? '#333' : '#f0f0f0',
                    }}
                />

                {/* Send Button */}
                <IconButton
                    color="primary"
                    onClick={() => alert('Sending...')}
                    sx={{ padding: '8px' }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default MessagesChat;