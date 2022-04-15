import React from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const ChangePassword = ({ themeModes }) => {

     // makeStyles functional object..
     const useStyles = makeStyles({
        'input-border': {
            borderColor: themeModes.contrastMode || themeModes.darkMode ? 'gray' : null
        }
    });
    const classes = useStyles();

    // inputFieldStyle...
    const inputFieldStyle = {
        input: { color: themeModes.contrastMode || themeModes.darkMode ? 'lightgray' : null },
        label: { color: themeModes.contrastMode || themeModes.darkMode ? 'gray' : null }
    };

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
                    sx={inputFieldStyle}
                    InputProps={{
                        classes: {
                            notchedOutline: classes['input-border'],
                        },
                    }}
                />

                {/* ----- New Password ----- */}
                <TextField
                    id="outlined-basic"
                    label="New password"
                    variant="outlined"
                    sx={inputFieldStyle}
                    InputProps={{
                        classes: {
                            notchedOutline: classes['input-border'],
                        },
                    }}
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