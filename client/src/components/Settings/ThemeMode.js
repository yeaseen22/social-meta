import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon, Contrast as ContrastIcon } from '@mui/icons-material';
import StylesModule from '../../css/settings.module.css';

const ThemeMode = ({ 
    lightMode,
    darkMode,
    contrastMode,
    iconColor,
    makeLightMode, 
    makeDarkMode, 
    makeContrastMode 
}) => {

    return (
        <List>
            <ListItem>
                <ListItemText primary={'Theme Mode'} />
            </ListItem>

            {/*--------- ThemeMode's  -------*/}
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
    );
};

export default ThemeMode;