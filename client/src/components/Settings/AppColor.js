import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon, Contrast as ContrastIcon } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import StylesModule from '../../css/settings.module.css';

const AppColor = () => {
    // const [appColor, setAppColor] = React.useState({
    //     lightgray: false,
    //     royalblue: false,
    //     green: false,
    //     red: false,
    // });

    const [lightgray, setLightgray] = React.useState(false);
    const [royalblue, setRoyalblue] = React.useState(false);
    const [green, setGreen] = React.useState(false);
    const [red, setRed] = React.useState(false);

    const makeActiveColor = (type) => {
        switch (type) {
            case "lightgray":
                setLightgray(true);
                setRoyalblue(false);
                setGreen(false);
                setRed(false);
                break;

            case "royalblue":
                setLightgray(false);
                setRoyalblue(true);
                setGreen(false);
                setRed(false);
                break;

            case "green":
                setLightgray(false);
                setRoyalblue(false);
                setGreen(true);
                setRed(false);
                break;

            case "red":
                setLightgray(false);
                setRoyalblue(false);
                setGreen(false);
                setRed(true);
                break;
        }
    };

    return (
        <List>
            <ListItem>
                <ListItemText primary={'App Color'} />
            </ListItem>

            {/*-------- App Color's --------*/}
            <ListItem>
                <ListItemIcon onClick={() => makeActiveColor('lightgray')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'lightgray', background: `${lightgray && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeActiveColor('royalblue')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'royalblue', background: `${royalblue && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeActiveColor('green')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'green', background: `${green && 'lightgrey'}` }} />
                </ListItemIcon>

                <ListItemIcon onClick={() => makeActiveColor('red')}>
                    <CircleIcon className={StylesModule.modeIcon} style={{ color: 'red', background: `${red && 'lightgrey'}` }} />
                </ListItemIcon>
            </ListItem>
        </List>
    );
};

export default AppColor;