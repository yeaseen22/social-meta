import * as React from 'react';
import {
    Paper,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button
} from "@mui/material";
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';

// Suggested Connection component..
const SuggestedFollows = () => {
    const [followToggle, setFollowToggle] = React.useState(false);

    const connectToggleClicked = () => {
        setFollowToggle(!followToggle ? true : false);
    };

    const buttonPosition = {
        left: '10px',
    };


    return (
        <Paper style={{ marginTop: '1rem', marginBottom: '1rem', width: 358 }}>
               <List>
                   {/*---- 1st ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Asad Anik"
                           secondary={
                               <React.Fragment>
                                   {!followToggle ? "Not followed yet - " : "You are following - "}

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={connectToggleClicked}
                                       style={buttonPosition}
                                   >
                                       {!followToggle ? "Follow" : "Unfollow"}
                                   </Button>
                               </React.Fragment>
                           }
                       />
                   </ListItem>

                   <Divider variant="inset" component="li" />

                   {/*---- 2nd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Unknown User"
                           secondary={
                               <React.Fragment>
                                   {!followToggle ? "Not followed yet - " : "You are following - "}

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={connectToggleClicked}
                                       style={buttonPosition}
                                   >
                                       {!followToggle ? "Follow" : "Unfollow"}
                                   </Button>
                               </React.Fragment>
                           }
                       />
                   </ListItem>

                   <Divider variant="inset" component="li" />

                   {/*---- 3rd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Jenny Lara"
                           secondary={
                               <React.Fragment>
                                   {!followToggle ? "Not followed yet - " : "You are following - "}

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={connectToggleClicked}
                                       style={buttonPosition}
                                   >
                                       {!followToggle ? "Follow" : "Unfollow"}
                                   </Button>
                               </React.Fragment>
                           }
                       />
                   </ListItem>
               </List>
        </Paper>
    );
};

export default SuggestedFollows;
