// Posts Reducer..
export function PostReducer(state={}, action){
    switch (action.type){
        case "READ_ALL_POSTS":
            return { ...state, allPosts: action.payload };

        case "POST_CREATE":
            return { ...state, createdPost: action.payload };

        case "CURRENT_USER_POSTS":
            return { ...state, currentUserPosts: action.payload };

        default:
            return state;
    }
}
