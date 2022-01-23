import axios from 'axios';

// Auth of User..
export function auth() {
    const request = axios.get('/api/auth')
        .then(response => response.data)
        .catch(err => err.message);

    return {
        type: "USER_AUTH",
        payload: request
    };
}

// Logout User..
export function logout(){
    const request = axios.get('/api/logout')
        .then(response => response.data)
        .catch(err => err.message);

    return {
        type: "USER_LOGOUT",
        payload: request
    };
}

// Login User..
export function loginUser(data){
    const request = axios.post('/api/login', data)
        .then(response => response.data)
        .catch(err => err.message);

    return {
        type: "USER_LOGIN",
        payload: request
    };
}

// Sign Up User..
export function register(data){
    const request = axios.post('/api/register', data)
        .then(response => response.data);

    return {
        type: "USER_REGISTER",
        payload: request
    };
}

// profile pictures upload..
export function profileUpload(data){
    const request = axios.post('/api/profile_upload', data)
        .then(response => response.data);

    return {
        type: "PROFILE_UPLOAD",
        payload: request
    };
}
