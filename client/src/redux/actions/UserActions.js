import axios from 'axios';

// User By Id..
export function userById(id) {
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
export function register(data){
    const request = axios.post('/api/register', data)
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
