import React from 'react';
import { Paper } from '@mui/material';
import StylesModule from '../../css/birthdate.module.css';

// Component of Birthdate..
const Birthdate = () => {
    return (
        <Paper className={StylesModule.birthdatePaper}>
            <h3>Thu Jan 13 2000 19:55:41 GMT+0600 (+06)</h3>
        </Paper>
    );
};

export default Birthdate;
