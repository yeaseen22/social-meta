import axios from 'axios';

// Liked Post here..
export function likedPost(isLiked, postId, data) {
    const request = axios.get(`/api/get_post_likes?postId=${postId}`)
        .then(response => {
            let likeCounter = null;

            if (response.data.likes) {
                likeCounter = response.data.likes;
                console.log('BEFORE -- ', likeCounter);
            }

            if (!response.data.likes){
                likeCounter = 0;
            }

            if (!isLiked) {
                likeCounter = likeCounter - 1;
            }

            if (isLiked) {
                likeCounter = likeCounter + 1;
            }

            console.log('AFTER -- ', likeCounter);

            const request = axios.post(`/api/post_like?postId=${postId}&likes=${likeCounter}`, data)
                .then(response => response.data)
                .catch(error => console.log('ERR! when try to make like into Post by post req. ', error.message));

            return request;
        })
        .catch(error => console.log('ERR! when try to grave likes from post. ', error.message));

    return {
        type: "LIKED_POST",
        payload: request
    };
}

// User Posts for ProfileOthers..
export function postsByUserId(userId) {
    const request = axios.get(`/api/user_posts?userId=${userId}`)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make get posts by userId', error.message));

    return {
        type: "POSTS_BY_USER_ID",
        payload: request
    };
}

// Delete Post..
export function deletePost(postId) {
    const request = axios.delete(`/api/post_delete?id=${postId}`)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make delete post -> ', error.message));

    return {
        type: "POST_DELETE",
        payload: request
    };
}

// Read Post..
export function readPost(postId) {
    const request = axios.get(`/api/post_read?postId=${postId}`)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make read post -> ', error.message));

    return {
        type: "POST_READ",
        payload: request
    };
}

// Update Post..
export function updatePost(data) {
    const request = axios.post('/api/post_update', data)
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make update post -> ', error.message));

    return {
        type: "POST_UPDATE",
        payload: request
    };
}

// Showing All Posts (ReadAllPosts)..
export function readAllPosts() {
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
export function currentUserPosts() {
    const request = axios.get('/api/current_user_posts')
        .then(response => response.data)
        .catch(error => console.log('ERR! when try to make read current user posts -> ', error.message));

    return {
        type: "CURRENT_USER_POSTS",
        payload: request
    };
}
