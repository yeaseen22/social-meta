import axios from 'axios';

// initial themeMode setting..
const initialThemeModeSetting = {
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

// Own Profile..
export function ownProfileInfo(){
    const request = axios.get('/api/profile')
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to get own profile info -> ', err.message));

    return {
        type: "OWN_PROFILE_INFO",
        payload: request
    };
}

// Others Profile User By Id..
export function userInfoById(id) {
    const request = axios.get(`/api/profile_by_id?userId=${id}`)
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to get profileById -> ', err.message));

    return {
        type: "USER_BY_ID",
        payload: request
    };
}

// Auth of User..
export function auth() {
    const request = axios.get('/api/auth')
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to get auth -> ', err.message));

    return {
        type: "USER_AUTH",
        payload: request
    };
}

// Logout User..
export function logout(){
    const request = axios.get('/api/logout')
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to make logout -> ', err.message));

    return {
        type: "USER_LOGOUT",
        payload: request
    };
}

// Login User..
export function loginUser(data){
    const request = axios.post('/api/login', data)
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to post user login -> ', err.message));

    return {
        type: "USER_LOGIN",
        payload: request
    };
}

// Sign Up User..
export async function register(data){
    const request = await axios.post('/api/register', data)
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to post user register -> ', err.message));

    return {
        type: "USER_REGISTER",
        payload: request
    };
}

// profile pictures upload..
export function profileUpload(data){
    const request = axios.post('/api/profile_upload', data)
        .then(response => response.data)
        .catch(err => console.log('ERR! when try to post user profile upload -> ', err.message));

    return {
        type: "PROFILE_UPLOAD",
        payload: request
    };
}

// Show All Users..
export async function showAllUsers(){
    const request = axios.get('/api/read_all_users')
        .then(response => response.data.users)
        .catch(err => console.log('Get ERR! when try to fetch all users data.', err.message));

    return {
        type: "ALL_USERS",
        payload: request
    };
}