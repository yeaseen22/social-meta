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
import { 
    themeModeLight, 
    themeModeDark, 
    themeModeHighContrast,
    appColorBlack,
    appColorRoyalblue,
    appColorGreen,
    appColorRed
} from '../../redux/actions/SettingActions';
import ThemeMode from './ThemeMode';
import AppColor from './AppColor';


// Main Settings Component..
const Settings = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [themeModes, setThemeModes] = useState({
        lightMode: false,
        darkMode: false,
        contrastMode: false
    });
    const [appColor, setAppColor] = useState({
        royalblue: false,
        black: false,
        red: false,
        green: false
    });

    // ThemeMode Controller..
    const themeModeController = (mode) => {
        // working on themeMode...
        if (mode === 'lightMode') {
            setThemeModes({
                lightMode: true,
                darkMode: false,
                contrastMode: false
            });
            props.dispatch(themeModeLight());
        }

        if (mode === 'darkMode') {
            setThemeModes({
                lightMode: false,
                darkMode: true,
                contrastMode: false
            });
            props.dispatch(themeModeDark());
        }

        if (mode === 'contrastMode') {
            setThemeModes({
                lightMode: false,
                darkMode: false,
                contrastMode: true
            });
            props.dispatch(themeModeHighContrast());
        }
    };

    // AppColor Controller...
    const colorModeController = (mode) => {
        // working on colorMode..
        if (mode === 'royalblue') {
            setAppColor({ ...appColor, royalblue: true });
            props.dispatch(appColorRoyalblue());
        }

        if (mode === 'black') {
            setAppColor({ ...appColor, black: true });
            props.dispatch(appColorBlack());
        }

        if (mode === 'red') {
            setAppColor({ ...appColor, red: true });
            props.dispatch(appColorRed());
        }

        if (mode === 'green') {
            setAppColor({ ...appColor, green: true });
            props.dispatch(appColorGreen());
        }
    };

    // React Hook...
    useEffect(() => {
        // useEffect.. body area..
        // const { themeMode } = props.User.login;

        if (props.User) {
            if (props.User.login) {
                const { themeMode, colorMode } = props.User.login;

                // console.log('MODE  -->> ', themeMode);

                // manage themeMode..
                themeModeController(themeMode);

                // manage colorMode..
                colorModeController(colorMode);
            }
        }


        // cleanup function...
        return () => {
            setThemeModes({ ...themeModes });
            setAppColor({ ...appColor });
        };
    }, [props.User.login]);

    // console.log('Settings PROPS = here -- ', props);

    // themeMode Object..
    const themeMode = { backgroundColor: 'white', textColor: 'black', iconColor: 'gray' };

    if (props.Settings) {
        if (props.Settings.themeMode) {
            // themeMode's here..
            const { backgroundColor, textColor, iconColor } = props.Settings.themeMode;

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

    // console.log('Theme is now for there -- ', themeMode);

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
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // the function for generating themeMode..
    const makeChangeThemeMode = (type) => {
        switch (type) {
            case "lightMode":
                setThemeModes({
                    lightMode: true,
                    darkMode: false,
                    contrastMode: false
                });
                props.dispatch(themeModeLight());
                break;

            case "darkMode":
                setThemeModes({
                    lightMode: false,
                    darkMode: true,
                    contrastMode: false
                });
                props.dispatch(themeModeDark());
                break;

            case "contrastMode":
                setThemeModes({
                    lightMode: false,
                    darkMode: false,
                    contrastMode: true
                });
                props.dispatch(themeModeHighContrast());
                break;

            default:
                setThemeModes({ ...themeModes });
        }
    };

    // the function for generating color..
    const makeChangeAppColor = (type) => {
        switch (type) {
            case "black":
                setAppColor({
                    royalblue: false,
                    black: true,
                    green: false,
                    red: false
                });
                props.dispatch(appColorBlack());
                break;

            case "royalblue":
                setAppColor({
                    royalblue: true,
                    black: false,
                    green: false,
                    red: false
                });
                props.dispatch(appColorRoyalblue());
                break;

            case "green":
                setAppColor({
                    royalblue: false,
                    black: false,
                    green: true,
                    red: false
                });
                props.dispatch(appColorGreen());
                break;

            case "red":
                setAppColor({
                    royalblue: false,
                    black: false,
                    green: false,
                    red: true
                });
                props.dispatch(appColorRed());
                break;

            default:
                setAppColor({ ...appColor });
        }
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
                themeModes={themeModes}
                iconColor={themeMode.iconColor}
                makeChangeThemeMode={makeChangeThemeMode}
            />

            {/*----- Application's App Color Here -----*/}
            <AppColor
                colorMode={appColor}
                makeChangeAppColor={makeChangeAppColor}
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
