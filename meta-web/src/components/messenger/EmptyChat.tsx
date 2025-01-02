import React from 'react';
import { Paper, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useColorScheme } from '@mui/material/styles';

const EmptyChat = () => {
    const { mode } = useColorScheme();
    const themeClass = mode === 'dark' ? 'dark-theme' : 'light-theme';
    
    return (
        <Paper elevation={3} sx={{ height: '100%', paddingTop: '25%' }} className={themeClass}>
            {/* Empty Interface */}
            <ChatIcon sx={{ fontSize: '100px', margin: 'auto', display: 'block', color: 'gray' }} />
            <Typography variant="h4" sx={{ padding: '16px', textAlign: 'center', color: 'gray' }}>
                Select Chat & Start Typing
            </Typography>
        </Paper>
    )
}

export default EmptyChat