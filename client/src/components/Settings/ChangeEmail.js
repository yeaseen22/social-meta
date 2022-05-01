import React from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const ChangeEmail = ({ themeModes }) => {
    // console.log('Change Email component -- ', themeModes);
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
                <ListItemText primary={'Change Primary Email'} />
            </ListItem>

            <ListItem>
                {/* ----- FirstName ----- */}
                <TextField
                    style={{ paddingRight: '1rem' }}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    sx={inputFieldStyle}
                    InputProps={{
                        classes: {
                            notchedOutline: classes['input-border'],
                        },
                    }}
                />

                {/* ----- LastName ----- */}
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    sx={inputFieldStyle}
                    InputProps={{
                        classes: {
                            notchedOutline: classes['input-border'],
                        }
                    }}
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