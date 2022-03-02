// initial State..
const initialState = {
    themeMode: {
        backgroundColor: 'white',
        textColor: 'black',
        iconColor: 'gray',
        cardBackgroundColor: '',
        cardFontColor: '',
        cardSubFontColor: '',
        cardBorder: ''
    }
};

// Settings Reducer..
export function SettingsReducer(state = initialState, action){
    switch (action.type){
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
