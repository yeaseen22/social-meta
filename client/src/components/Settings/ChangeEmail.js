import React from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const ChangeEmail = () => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={'Change Primary Email'} />
            </ListItem>

            <ListItem>
                {/* ----- FirstName ----- */}
                <TextField
                    style={{ paddingRight: '1rem' }}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                />

                {/* ----- LastName ----- */}
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                />
            </ListItem>

            <ListItem>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Change Username
                </Button>
            </ListItem>
        </List>
    );
};

export default ChangeEmail;