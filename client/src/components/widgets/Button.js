import React from 'react';
import { Button } from '@mui/material';
import {
    Send as SendIcon,
    Cancel as CancelIcon,
    AddComment as AddCommentIcon
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';


const CustomButton = ({ type, clickHandler }) => {
    // rendering button..
    const renderButton = (TYPE, clickHandler) => {
        switch (TYPE) {
            case "UPDATE":
                return (
                    <Button
                        variant="contained"
                        fullWidth={true}
                        color="secondary"
                        endIcon={<SendIcon />}
                        onClick={clickHandler}
                    >
                        update
                    </Button>
                );

            case "CANCEL":
                return (
                    <Button
                        variant="contained"
                        fullWidth={true}
                        color="error"
                        endIcon={<CancelIcon />}
                        onClick={clickHandler}
                    >
                        cancel
                    </Button>
                );

            case "COMMENT":
                return (
                    <Button
                        variant="contained"
                        fullWidth={true}
                        color="primary"
                        endIcon={<AddCommentIcon />}
                        onClick={clickHandler}
                    >
                        comment
                    </Button>
                );

            case "LOADING":
                return (
                    <LoadingButton
                        loading
                        variant="outlined"
                        style={{
                            width: '100%',
                            height: '30px',
                        }}
                    />
                );

            default:
                return <h3>{TYPE} Button Not Found!</h3>;
        }
    };

    // return the button statements here..
    return renderButton(type, clickHandler);
};

export default CustomButton;
