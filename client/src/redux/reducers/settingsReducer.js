// Settings Reducer..
export function SettingsReducer(state = {
    themeMode: {backgroundColor: 'white', textColor: 'black', iconColor: 'gray'}
}, action){
    switch (action.type){
        case "THEME_MODE_LIGHT":
            return { ...state, themeMood: action.payload };

        case "THEME_MODE_DARK":
            return { ...state, themeMood: action.payload };

        default:
            return state;
    }
}
