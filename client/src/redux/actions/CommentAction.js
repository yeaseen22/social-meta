import axios from 'axios';
import httpConfig from '../../utils/httpConfig';

// COMMENT API ENDPOINT..
const COMMENT_API_ENDPOINT = `${process.env.REACT_APP_BACKEND_API}/comment`;

// Create Comment with Async-Await..
export async function createComment(data){
    const { data: comment } = await axios.post(`${COMMENT_API_ENDPOINT}/make_comment`, data, httpConfig);
    return {
        type: "MAKE_COMMENT",
        payload: comment
    };
};

// Read Comments with Async-Await..
export async function readComment(postId){
    // const request = axios.get(`/api/read_comment/${postId}`)
    //     .then(response => response.data)
    //     .catch(error => {
    //         console.log('ERR! here -- ', error.message);
    //     });

    try{
        const { data: comments } = await axios.get(`${COMMENT_API_ENDPOINT}/read_comment?postId=${postId}`, httpConfig);
        return {
            type: "READ_COMMENT",
            payload: comments
        };

    }catch(error){
        console.log('ERR! -- ', error.message);
    }
};

// Update Comments with Async-Await..
export async function updateComment(data){
    const { data: comment } = await axios.post(`${COMMENT_API_ENDPOINT}/update_comment`, data, httpConfig);
    return {
        type: "UPDATE_COMMENT",
        payload: comment
    };
};

// Delete Comments with Async-Await..
export async function deleteComment(commentId){
    const { data: comment } = await axios.delete(`${COMMENT_API_ENDPOINT}/comment_delete?id=${commentId}`, httpConfig);
    return {
        type: "DELETE_COMMENT",
        payload: comment
    };
};