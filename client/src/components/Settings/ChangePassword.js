import React from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const ChangePassword = () => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={'Change Password'} />
            </ListItem>

            <ListItem>
                {/* ----- Old Password ----- */}
                <TextField
                    style={{ paddingRight: '1rem' }}
                    id="outlined-basic"
                    label="Old password"
                    variant="outlined"
                />

                {/* ----- New Password ----- */}
                <TextField
                    id="outlined-basic"
                    label="New password"
                    variant="outlined"
                />
            </ListItem>

            <ListItem>
                <Button 
                    variant="contained" 
                    color="primary"
                >
                    Change Password
                </Button>
            </ListItem>
        </List>
    );
};

export default ChangePassword;