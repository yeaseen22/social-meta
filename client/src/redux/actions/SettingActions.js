// Theme Mode Light..
export function themeModeLight(){
    const themeMode = {
        backgroundColor: 'white',
        textColor: 'black',
        iconColor: 'gray',
        cardBackgroundColor: '',
        cardFontColor: '',
        cardSubFontColor: '',
        cardBorder: ''
    };

    return {
        type: "THEME_MODE_LIGHT",
        payload: themeMode
    };
}

// Theme Mode Dark..
export function themeModeDark(){
    const themeMode = {
        backgroundColor: 'black',
        textColor: 'lightgray',
        iconColor: 'gray',
        cardBackgroundColor: 'black',
        cardFontColor: 'lightgray',
        cardSubFontColor: 'gray',
        cardBorder: '1px solid gray'
    };

    return {
        type: "THEME_MODE_DARK",
        payload: themeMode
    };
}
