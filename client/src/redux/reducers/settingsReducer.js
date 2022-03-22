// Settings Reducer..
export function SettingsReducer(state = {}, action){
    switch (action.type){
        case "INITIAL_THEME_MODE":
            return { ...state, themeMode: action.payload };

        case "THEME_MODE_HIGH_CONTRAST":
            return { ...state, themeMode: action.payload };

        case "THEME_MODE_LIGHT":
            return { ...state, themeMode: action.payload };

        case "THEME_MODE_DARK":
            return { ...state, themeMode: action.payload };

        default:
            return state;
    }
}
