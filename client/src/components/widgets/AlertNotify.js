import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AlertNotify = ({ type, message }) => {

    const showAlertNotifyByCondition = (type, msg) => {
        switch (type) {
            case "ERROR":
                return (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error notify — <strong>{msg}!</strong>
                    </Alert>
                );

            case "SUCCESS":
                return (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success notify — <strong>{msg}!</strong>
                    </Alert>
                );

            case "WARNING":
                return (
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        This is a warning notify — <strong>{msg}!</strong>
                    </Alert>
                );

            case "INFO":
                return (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        This is an info notify — <strong>{msg}!</strong>
                    </Alert>
                );
        }
    };


    return showAlertNotifyByCondition(type, message);
};

export default AlertNotify;