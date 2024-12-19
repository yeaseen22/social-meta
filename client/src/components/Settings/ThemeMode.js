import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon, Contrast as ContrastIcon } from '@mui/icons-material';
import StylesModule from '../../css/settings.module.css';

const ThemeMode = ({ 
    themeModes,
    iconColor,
    makeChangeThemeMode
}) => {

    return (
        <List>
            <ListItem>
                <ListItemText primary={'Theme Mode'} />
            </ListItem>

            {/*--------- ThemeMode's  -------*/}
            <ListItem>
                <ListItemIcon onClick={() => makeChangeThemeMode('lightMode')} style={{ color: iconColor }}>
                    <LightModeIcon className={StylesModule.modeIcon} style={{ background: `${themeModes.lightMode && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeChangeThemeMode('darkMode')} style={{ color: iconColor }}>
                    <DarkModeIcon className={StylesModule.modeIcon} style={{ background: `${themeModes.darkMode && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeChangeThemeMode('contrastMode')} style={{ color: iconColor }}>
                    <ContrastIcon className={StylesModule.modeIcon} style={{ background: `${themeModes.contrastMode && 'lightgrey'}` }} />
                </ListItemIcon>
            </ListItem>
        </List>
    );
};

export default ThemeMode;