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
} from '@mui/icons-material';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { initialMode, themeModeLight, themeModeDark, themeModeHighContrast } from '../../redux/actions/SettingActions';
import ThemeMode from './ThemeMode';

// Main Settings Component..
const Settings = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [lightMode, setLightMode] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [contrastMode, setContrastMode] = useState(false);

    const initialTheme = {
        themeMode: {
            backgroundColor: 'white',
            textColor: 'black',
            iconColor: 'pink'
        }
    };

    // React Hook...
    useEffect(() => {
        // useEffect.. body area..
        // const { themeMode } = props.User.login;

        if (props.User){
           if (props.User.login){
               const { themeMode } = props.User.login;

               // console.log('MODE  -->> ', themeMode);

               if (themeMode === 'lightMode'){
                   setLightMode(true);
                   setDarkMode(false);
                   setContrastMode(false);
                   props.dispatch(themeModeLight());
               }

               if (themeMode === 'darkMode'){
                   setLightMode(false);
                   setDarkMode(true);
                   setContrastMode(false);
                   props.dispatch(themeModeDark());
               }

               if (themeMode === 'contrastMode'){
                   setLightMode(false);
                   setDarkMode(false);
                   setContrastMode(true);
                   props.dispatch(themeModeHighContrast());
               }
           }
        }


        // cleanup function...
        return () => {
            setLightMode(false);
            setDarkMode(false);
            setContrastMode(false);
        };
    }, [props.User.login]);

    console.log('Settings ReducthmeMode.ers here -- ', props);

    // themeMode Object..
    const themeMode = { backgroundColor: 'white', textColor: 'black', iconColor: 'gray' };

    if(props.Settings){
        if (props.Settings.themeMode){
            // themeMode's here..
            const {  backgroundColor, textColor, iconColor  } = props.Settings.themeMode;

            themeMode.backgroundColor = backgroundColor;
            themeMode.textColor = textColor;
            themeMode.iconColor = iconColor;

            // setThemeMode({
            //     backgroundColor,
            //     textColor,
            //     iconColor
            // });
        }
    }

    console.log('Theme is now for there -- ', themeMode);

    // Styled Paper Component..
    // Used this Styled Component to pass CSS to Drawer's Paper props inner drawer component..
    const StyledPaper = styled.div`
      // my styles
      border-radius: 20px 0 0 20px;
      background: ${themeMode.backgroundColor};
      color: ${themeMode.textColor};
    `;

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
                       <ListItemIcon style={{ color: themeMode.iconColor }}>
                           <SettingsIcon />
                       </ListItemIcon>
                       <ListItemText primary={'Settings'} />
                   </ListItem>
               </List>
               <Divider style={{ background: themeMode.iconColor }} />

               {/*----- Application's Theme Mode Here -----*/}
               <ThemeMode
                    lightMode={lightMode}
                    darkMode={darkMode}
                    contrastMode={contrastMode}
                    iconColor={themeMode.iconColor}
                    makeLightMode={makeLightMode}
                    makeDarkMode={makeDarkMode}
                    makeContrastMode={makeContrastMode}
                />

               <List>
                   {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                       <ListItem button key={text}>
                           <ListItemIcon style={{ color: themeMode.iconColor }}>
                               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                       </ListItem>
                   ))}
               </List>
               <Divider style={{ background: themeMode.iconColor }} />
               <List>
                   {['All mail', 'Trash', 'Spam'].map((text, index) => (
                       <ListItem button key={text}>
                           <ListItemIcon style={{ color: themeMode.iconColor }}>
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
        Settings: state.Settings,
        User: state.User
    };
};

export default connect(mapStateToProps)(Settings);
