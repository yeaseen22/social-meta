import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from '@mui/material';
import {
    MoveToInbox as InboxIcon,
    Mail as MailIcon,
    Settings as SettingsIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { themeModeLight, themeModeDark } from '../../redux/actions/SettingActions';

// Main Settings Component..
const Settings = (props) => {
    const { backgroundColor, textColor, iconColor } = props.Settings.themeMode;

    // Styled Paper Component..
    // Used this Styled Component to pass CSS to Drawer's Paper props inner drawer component..
    const StyledPaper = styled.div`
      // my styles
      border-radius: 20px 0 0 20px;
      background: ${backgroundColor};
      color: ${textColor};
    `;

    // console.log(props);

    const [drawerOpen, setDrawerOpen] = useState(false);

    // toggle drawer is there..
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setDrawerOpen(open);
    };

    // make dark mode..
    const makeDarkMode = () => {
        props.dispatch(themeModeDark());
        console.log(props);
    };

    // list component..
    const list = (anchor, dispatch) => (
           <Box
               sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
               role="presentation"
               onClick={toggleDrawer(anchor, false)}
               onKeyDown={toggleDrawer(anchor, false)}
           >
               <List>
                   {/*--- This is first header here for settings and close the settings ----*/}
                   <ListItem>
                       <ListItemIcon style={{ color: iconColor }}>
                           <SettingsIcon />
                       </ListItemIcon>
                       <ListItemText primary={'Settings'} />
                   </ListItem>
               </List>
               <Divider style={{ background: iconColor }} />

               <List>
                   <ListItem>
                       <ListItemText primary={'Theme Mode'} />
                   </ListItem>
                   <ListItem>
                       <ListItemIcon>
                           <LightModeIcon />
                       </ListItemIcon>

                       <ListItemIcon onClick={makeDarkMode}>
                           <DarkModeIcon />
                       </ListItemIcon>
                   </ListItem>
               </List>

               <List>
                   {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                       <ListItem button key={text}>
                           <ListItemIcon style={{ color: iconColor }}>
                               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                       </ListItem>
                   ))}
               </List>
               <Divider style={{ background: iconColor }} />
               <List>
                   {['All mail', 'Trash', 'Spam'].map((text, index) => (
                       <ListItem button key={text}>
                           <ListItemIcon style={{ color: iconColor }}>
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
        <React.Fragment>
            {/*---- Settings Icon here to define the toggleDrawer ----*/}
            <SettingsIcon onClick={toggleDrawer(true)} />

            {/*---- Drawer defined ----*/}
            <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ component: StyledPaper }}
            >
                {list('right')}
            </Drawer>
        </React.Fragment>
    );
};

// mapStateToProps...
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings
    };
};

export default connect(mapStateToProps)(Settings);
