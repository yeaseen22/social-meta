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
import {
    AddCircle as AddCircleIcon,
    RemoveCircle as RemoveCircleIcon,
    FollowTheSigns as FollowTheSignIcon
} from '@mui/icons-material';
import { connect } from "react-redux";

// Suggested Connection component..
const SuggestedFollows = (props) => {
    const [followToggle, setFollowToggle] = React.useState(false);

    // ThemeMode..
    const { backgroundColor, textColor, cardSubFontColor } = props.Settings.themeMode;

    const connectToggleClicked = () => {
        setFollowToggle(!followToggle ? true : false);
    };

    const buttonPosition = {
        left: '10px',
    };

    // returning statement..
    return (
        <Paper style={{ marginTop: '1rem', marginBottom: '1rem', width: 358, background: backgroundColor, color: textColor }}>
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
                                   <span style={{ color: cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

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

                   <Divider variant="inset" component="li" style={{ background: cardSubFontColor }} />

                   {/*---- 2nd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Unknown User"
                           secondary={
                               <React.Fragment>
                                    <span style={{ color: cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

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

                   <Divider variant="inset" component="li" style={{ background: cardSubFontColor }} />

                   {/*---- 3rd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Jenny Lara"
                           secondary={
                               <React.Fragment>
                                    <span style={{ color: cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

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

// mapStateToProps..
const mapStateToProps = (state) => {
    return {
        Settings: state.Settings
    };
};

export default connect(mapStateToProps)(SuggestedFollows);
