// Comment Reducer...
export function CommentReducer(state={}, action){
    switch(action.type){
        case "MAKE_COMMENT":
            return { ...state, comments: action.payload };

        case "READ_COMMENT":
            return { ...state, read_comments: action.payload };

        case "UPDATE_COMMENT":
            return { ...state, comments: action.payload };

        case "DELETE_COMMENT":
            return { ...state, comments: action.payload };

        default:
            return state;
    }
};