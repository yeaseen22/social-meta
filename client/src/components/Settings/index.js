import React, { useState, useEffect } from 'react';
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
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    Contrast as ContrastIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { initialMode, themeModeLight, themeModeDark, themeModeHighContrast } from '../../redux/actions/SettingActions';
import StylesModule from '../../css/settings.module.css';

// Main Settings Component..
const Settings = (props) => {
    // ThemeMode Hook..
    // const [themeMode, setThemeMode] = useState({});
    //
    // // useEffect Hook..
    // useEffect(() => {
    //     const initialTheme = props.Settings.themeMode;
    //     props.dispatch(initialMode(initialTheme));
    //
    //     // cleanup function..
    //     return () => {
    //         setThemeMode({});
    //     };
    // }, []);
    //
    // console.log('Initial ThemeMode -->> ', themeMode);

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
    const [lightMode, setLightMode] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [contrastMode, setContrastMode] = useState(false);

    // toggle drawer is there..
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setDrawerOpen(open);
    };

    // make contrast mode..
    const makeContrastMode = () => {
        setLightMode(false);
        setDarkMode(false);
        setContrastMode(true);
        props.dispatch(themeModeHighContrast());
    };

    // make light mode..
    const makeLightMode = () => {
        setLightMode(true);
        setDarkMode(false);
        setContrastMode(false);
        props.dispatch(themeModeLight());
    };

    // make dark mode..
    const makeDarkMode = () => {
        setLightMode(false)
        setDarkMode(true);
        setContrastMode(false);
        props.dispatch(themeModeDark());
    };

    // list component..
    const list = (anchor) => (
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

               {/*----- Application's Theme Mode Here -----*/}
               <List>
                   <ListItem>
                       <ListItemText primary={'Theme Mode'} />
                   </ListItem>
                   <ListItem>
                       <ListItemIcon onClick={makeLightMode} style={{ color: iconColor }}>
                           <LightModeIcon className={StylesModule.modeIcon} style={{ background: `${lightMode && 'lightgrey'}` }} />
                       </ListItemIcon>

                       <ListItemIcon onClick={makeDarkMode} style={{ color: iconColor }}>
                           <DarkModeIcon className={StylesModule.modeIcon} style={{ background: `${darkMode && 'lightgrey'}` }} />
                       </ListItemIcon>

                       <ListItemIcon onClick={makeContrastMode} style={{ color: iconColor }}>
                           <ContrastIcon className={StylesModule.modeIcon} style={{ background: `${contrastMode && 'lightgrey'}` }} />
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
