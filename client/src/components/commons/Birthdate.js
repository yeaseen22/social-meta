import React from 'react';
import { Paper } from '@mui/material';
import StylesModule from '../../css/birthdate.module.css';
import CakeIcon from '@mui/icons-material/Cake';

// CSS Style for birthdate icon..
const commonThemeColor = 'royalblue';
const birthdateIcon = {
    fontSize: '30px',
    position: 'relative',
    top: '5px',
    color: commonThemeColor
};

// CSS Style for birthdate text..
const birthdateText = {
    background: commonThemeColor,
    color: 'white',
    borderRadius: '5px',
    textAlign: 'center'
};


// Component of Birthdate..
const Birthdate = () => {
    return (
        <Paper className={StylesModule.birthdatePaper}>
            <h3>
                <span><CakeIcon style={birthdateIcon} /></span>
                <span> </span>
                <span>Birthdate</span>
            </h3>

            <p style={birthdateText}>Thu Jan 13 2000 19:55:41 GMT+0600 (+06)</p>
        </Paper>
    );
};

export default Birthdate;
