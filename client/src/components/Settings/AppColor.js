import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import StylesModule from '../../css/settings.module.css';

// Main component..
const AppColor = ({ colorMode, makeChangeAppColor }) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={'App Color'} />
            </ListItem>

            {/*-------- App Color's --------*/}
            <ListItem>
                <ListItemIcon onClick={() => makeChangeAppColor('royalblue')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'royalblue', background: `${colorMode.royalblue && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeChangeAppColor('black')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'black', background: `${colorMode.black && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeChangeAppColor('green')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'green', background: `${colorMode.green && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeChangeAppColor('red')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'red', background: `${colorMode.red && 'lightgrey'}` }} />
                </ListItemIcon>
            </ListItem>
        </List>
    );
};


export default AppColor;