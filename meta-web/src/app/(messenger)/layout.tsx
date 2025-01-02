// import "react-chat-elements/dist/main.css";
// USING CUSTOM CSS FROM THE LIBRARY FOR DARK MODE IS MISSING INTO THE LIBRARY..
import '@/styles/messenger/message-box.scss';
import '@/styles/messenger/message-list.scss';
import '@/styles/messenger/chatlist.scss';
import React from 'react';
import { Grid } from '@mui/material';
import { SidebarChat } from '@/components/messenger';
import '@/styles/messenger/messenger.module.scss';

const MessengerLayout = (props: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ height: '100vh' }}>
                {/* Sidebar */}
                <Grid item xs={12} sm={4} md={3}>
                    <SidebarChat />
                </Grid>

                {/* Middle Content (Chat area) */}
                <Grid item xs={12} sm={8} md={9}>
                    {/* <MessagesChat /> */}
                    {props.children}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default MessengerLayout;