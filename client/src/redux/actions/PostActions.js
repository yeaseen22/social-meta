import axios from 'axios';

// Delete Post..
export function deletePost(postId){
    const request = axios.delete(`/api/post_delete?id=${postId}`)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make delete post -> ', error.message));

    return {
        type: "POST_DELETE",
        payload: request
    };
}

// Read Post..
export function readPost(postId){
    const request = axios.get(`/api/post_read?postId=${postId}`)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make read post -> ', error.message));

    return {
        type: "POST_READ",
        payload: request
    };
}

// Update Post..
export function updatePost(data){
    const request = axios.post('/api/post_update', data)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make update post -> ', error.message));

    return {
        type: "POST_UPDATE",
        payload: request
    };
}

// Showing All Posts (ReadAllPosts)..
export function readAllPosts(){
    const request = axios.get('/api/read_all_posts')
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make read all post -> ', error.message));

    return {
        type: "READ_ALL_POSTS",
        payload: request
    };
}

// Post Create..
export function postCreate(data) {
    const request = axios.post('/api/post_create', data)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make create post -> ', error.message));

    return {
        type: "POST_CREATE",
        payload: request
    };
}

// Showing Current User Posts to profile..
export function currentUserPosts(){
    const request = axios.get('/api/current_user_posts')
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make read current user posts -> ', error.message));

    return {
        type: "CURRENT_USER_POSTS",
        payload: request
    };
}
