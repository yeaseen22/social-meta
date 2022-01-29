import axios from 'axios';

// Read Post..
export function readPost(postId){
    const request = axios.get(`/api/post_read?postId=${postId}`)
        .then(response => response.data);

    return {
        type: "POST_READ",
        payload: request
    };
}

// Update Post..
export function updatePost(data){
    const request = axios.post('/api/post_update', data)
        .then(response => response.data);

    return {
        type: "POST_UPDATE",
        payload: request
    };
}

// Showing All Posts (ReadAllPosts)..
export function readAllPosts(){
    const request = axios.get('/api/read_all_posts')
        .then(response => response.data);

    return {
        type: "READ_ALL_POSTS",
        payload: request
    };
}

// Post Create..
export function postCreate(data) {
    const request = axios.post('/api/post_create', data)
        .then(response => response.data);

    return {
        type: "POST_CREATE",
        payload: request
    };
}

// Showing Current User Posts to profile..
export function currentUserPosts(){
    const request = axios.get('/api/current_user_posts')
        .then(response => response.data);

    return {
        type: "CURRENT_USER_POSTS",
        payload: request
    };
}
