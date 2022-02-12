import React from 'react';
import { Avatar, AvatarGroup, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import StylesModule from '../../css/friendsBar.module.css';

// Styled Badge from Material UI...
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


// main component..
const FriendsBar = () => {
    return (
            <AvatarGroup total={24} className={StylesModule.friendBarPaper}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </StyledBadge>

                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />

                {/*---- More then Showing.. ----*/}
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            </AvatarGroup>
    );
};

export default FriendsBar;
