import React from 'react';
import { Button } from '@mui/material';
import { 
    Send as SendIcon, 
    Cancel as CancelIcon, 
    AddComment as AddCommentIcon 
} from '@mui/icons-material';


const CustomButton = ({ type, clickHandler }) => {

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

            default:
                return <h3>{TYPE} Button Not Found!</h3>;
        }
    };

    // return the button statements here..
    return renderButton(type, clickHandler);
};

export default CustomButton;