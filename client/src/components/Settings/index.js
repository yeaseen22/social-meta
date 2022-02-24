import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    MoveToInbox as InboxIcon,
    Mail as MailIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';


const Settings = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // toggle drawer is there..
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setDrawerOpen(open);
    };

    // list component..
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // returning statement..
    return (
        <div>
                <React.Fragment>
                    {/*---- Settings Icon here to define the toggleDrawer ----*/}
                    <SettingsIcon onClick={toggleDrawer(true)} />

                    {/*---- Drawer defined ----*/}
                    <Drawer
                        anchor={'right'}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        {list('right')}
                    </Drawer>
                </React.Fragment>
        </div>
    );
};

export default Settings;
