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
    const [themeMode, setThemeMode] = React.useState({
        backgroundColor: '',
        textColor: '',
        cardSubFontColor: ''
    });

    // ThemeMode..
    // const { backgroundColor, textColor, cardSubFontColor } = props.Settings.themeMode;

   React.useEffect(() => {
       // Hook body..
       if (props.Settings){
           if (props.Settings.themeMode){
               const { backgroundColor, textColor, cardSubFontColor } = props.Settings.themeMode;
               setThemeMode({backgroundColor, textColor, cardSubFontColor});
           }
       }

       // cleanup function here..
       return () => {
           setThemeMode({
               backgroundColor: '',
               textColor: '',
               cardSubFontColor: ''
           });
       };
   }, [props.Settings]);

   // console.log('Props here -- ', props);


    const connectToggleClicked = (ID) => {
        if (ID === 1){
            setFollowToggle(!followToggle ? true : false);
        }
    };

    const buttonPosition = {
        left: '10px',
    };

    // returning statement..
    return (
        <Paper style={{ marginTop: '1rem', marginBottom: '1rem', width: 358, background: themeMode.backgroundColor, color: themeMode.textColor }}>
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
                                   <span style={{ color: themeMode.cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={() => connectToggleClicked(1)}
                                       style={buttonPosition}
                                   >
                                       {!followToggle ? "Follow" : "Unfollow"}
                                   </Button>
                               </React.Fragment>
                           }
                       />
                   </ListItem>

                   <Divider variant="inset" component="li" style={{ background: themeMode.cardSubFontColor }} />

                   {/*---- 2nd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Unknown User"
                           secondary={
                               <React.Fragment>
                                    <span style={{ color: themeMode.cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={() => connectToggleClicked(2)}
                                       style={buttonPosition}
                                   >
                                       {!followToggle ? "Follow" : "Unfollow"}
                                   </Button>
                               </React.Fragment>
                           }
                       />
                   </ListItem>

                   <Divider variant="inset" component="li" style={{ background: themeMode.cardSubFontColor }} />

                   {/*---- 3rd ----*/}
                   <ListItem alignItems="flex-start">
                       <ListItemAvatar>
                           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                       </ListItemAvatar>
                       <ListItemText
                           primary="Jenny Lara"
                           secondary={
                               <React.Fragment>
                                    <span style={{ color: themeMode.cardSubFontColor }}>
                                       {!followToggle ? "Not followed yet - " : "You are following - "}
                                   </span>

                                   <Button
                                       variant="outlined"
                                       color={!followToggle ? "primary" : "secondary"}
                                       startIcon={!followToggle ? <AddCircleIcon /> : <RemoveCircleIcon />}
                                       onClick={() => connectToggleClicked(3)}
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
