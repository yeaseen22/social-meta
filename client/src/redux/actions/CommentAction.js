import axios from 'axios';

// Create Comment with Async-Await..
export async function createComment(data){
    const { data: comment } = await axios.post('/api/make_comment', data);
    return {
        type: "MAKE_COMMENT",
        payload: comment
    };
};

// Read Comments with Async-Await..
export async function readComment(postId){
    const { data: comments } = await axios.get(`/api/read_comment/${postId}`);
    return {
        type: "READ_COMMENT",
        payload: comments
    };
}

// Update Comments with Async-Await..
export async function updateComment(data){
    const { data: comment } = await axios.post('/api/update_comment', data);
    return {
        type: "UPDATE_COMMENT",
        payload: comment
    };
};

// Delete Comments with Async-Await..
export async function deleteComment(commentId){
    const { data: comment } = await axios.delete(`/api/comment_delete?id=${commentId}`);
    return {
        type: "DELETE_COMMENT",
        payload: comment
    };
};