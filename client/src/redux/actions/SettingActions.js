// Theme Mood Light..
export function themeModeLight(){
    const themeMode = {
        backgroundColor: 'white',
        textColor: 'black',
        iconColor: 'gray'
    };

    return {
        type: "THEME_MOOD_LIGHT",
        payload: themeMode
    };
}

// Theme Mood Dark..
export function themeModeDark(){
    const themeMode = {
        backgroundColor: 'black',
        textColor: 'lightgray',
        iconColor: 'gray'
    };

    return {
        type: "THEME_MOOD_DARK",
        payload: themeMode
    };
}
