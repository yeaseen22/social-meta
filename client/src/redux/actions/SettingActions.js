import axios from 'axios';

// Initial Mode..
// export async function initialMode() {
//
//     console.log('---- CALLED THE INITIAL-MODE HERE -----');
//
//     const initialThemeModeSetting = {
//         themeMode: {
//             backgroundColor: 'white',
//             textColor: 'black',
//             iconColor: 'gray',
//             cardBackgroundColor: '',
//             cardFontColor: '',
//             cardSubFontColor: '',
//             cardBorder: ''
//         }
//     };
//
//     // make change to backend & DB...
//     await axios.post('/api/user_themeMode_updateName?themeMode=lightMode')
//         .then(response => response.data)
//         .catch(err => console.log('ERR!! error when try to maked lightMode Action -- ', err.message));
//
//
//     // set initial-Settings for this user...
//     const request = await axios.post(`/api/user_themeMode_set`, initialThemeModeSetting)
//         .then(response => response.data)
//         .catch(err => console.log('ERR! when try to post initialThemeModeSetting User Action -- ', err.message));
//
//     // Testing purpass..
//     // const themeMode = {
//     //     backgroundColor: 'black',
//     //     textColor: 'lightgray',
//     //     iconColor: 'gray',
//     //     cardBackgroundColor: 'black',
//     //     cardFontColor: 'lightgray',
//     //     cardSubFontColor: 'gray',
//     //     cardBorder: '1px solid gray'
//     // };
//
//     return {
//         type: "INITIAL_THEME_MODE",
//         payload: request,
//     };
// }

// Theme Mode High-Contrast..
export async function themeModeHighContrast() {
    const themeModeName = "contrastMode";
    // const themeMode = {
    //     backgroundColor: 'black',
    //     textColor: 'lightgray',
    //     iconColor: 'gray',
    //     cardBackgroundColor: 'black',
    //     cardFontColor: 'lightgray',
    //     cardSubFontColor: 'gray',
    //     cardBorder: '1px solid gray'
    // };

    // make change to backend & DB...
    await axios.post(`/api/user_themeMode_updateName?themeMode=contrastMode`)
        .then(response => response.data)
        .catch(err => console.log('ERR!! error when try to maked lightMode Action -- ', err.message));

    // new update..
    const highContrastTheme = {
        themeMode: {
            backgroundColor: 'black',
            textColor: 'lightgray',
            iconColor: 'gray',
            cardBackgroundColor: 'black',
            cardFontColor: 'lightgray',
            cardSubFontColor: 'gray',
            cardBorder: '1px solid gray'
        }
    };

    const request = await axios.post('/api/user_themeMode_update', highContrastTheme)
        .then(response => response.data)
        .catch(error => error.message);

    return {
        type: "THEME_MODE_HIGH_CONTRAST",
        payload: request
    };
}

// Theme Mode Light..
export async function themeModeLight() {
    const themeModeName = "lightMode";
    // const themeMode = {
    //     backgroundColor: 'white',
    //     textColor: 'black',
    //     iconColor: 'gray',
    //     cardBackgroundColor: '',
    //     cardFontColor: '',
    //     cardSubFontColor: '',
    //     cardBorder: ''
    // };

    // make change to backend & DB...
    await axios.post('/api/user_themeMode_updateName?themeMode=lightMode')
        .then(response => response.data)
        .catch(err => console.log('ERR!! error when try to maked lightMode Action -- ', err.message));

    // new update..
    const lightTheme = {
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

    const request = await axios.post('/api/user_themeMode_update', lightTheme)
        .then(response => response.data)
        .catch(error => error.message);

    return {
        type: "THEME_MODE_LIGHT",
        payload: request
    };
}

// Theme Mode Dark..
export async function themeModeDark() {
    const themeModeName = "darkMode";
    // const themeMode = {
    //     backgroundColor: 'rgb(0, 30, 60)',
    //     textColor: 'lightgray',
    //     iconColor: 'gray',
    //     cardBackgroundColor: 'rgba(0, 0, 0, 0.49)',
    //     cardFontColor: 'lightgray',
    //     cardSubFontColor: 'gray',
    //     cardBorder: '1px solid gray'
    // };

    // make change to backend & DB...
    const req = await axios.post('/api/user_themeMode_updateName?themeMode=darkMode')
        .then(response => response.data)
        .catch(err => console.log('ERR!! error when try to maked lightMode Action -- ', err.message));

    console.log('this is themeModeDark -- ', req);

    // new update...
    const darkTheme = {
        themeMode: {
            backgroundColor: 'rgb(0, 30, 60)',
            textColor: 'lightgray',
            iconColor: 'gray',
            cardBackgroundColor: 'rgba(0, 0, 0, 0.49)',
            cardFontColor: 'lightgray',
            cardSubFontColor: 'gray',
            cardBorder: '1px solid gray'
        }
    };

    const request = await axios.post('/api/user_themeMode_update', darkTheme)
        .then(response => response.data)
        .catch(error => error.message);

    return {
        type: "THEME_MODE_DARK",
        payload: request
    };
}
