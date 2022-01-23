import axios from 'axios';

// Post Create..
export function postCreate(data) {
    const request = axios.post('/api/post_create', data)
        .then(response => response.data);

    return {
        type: "POST_CREATE",
        payload: request
    };
}
