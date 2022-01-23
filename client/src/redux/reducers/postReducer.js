// Posts Reducer..
export function PostReducer(state={}, action){
    switch (action.type){
        case "POST_CREATE":
            return { ...state, createdPost: action.payload};

        default:
            return state;
    }
}
