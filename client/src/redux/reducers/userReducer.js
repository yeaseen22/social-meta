// Users Reducer..
export function UserReducer(state = {}, action) {
    switch (action.type) {
        case "USER_AUTH":
            return { ...state, login: action.payload };

        case "USER_LOGIN":
            return { ...state, login: action.payload };

        case "USER_REGISTER":
            return { ...state, register: action.payload };

        case "USER_EMAIL_CHECK":
            return { ...state, info: action.payload };

        case "PROFILE_UPLOAD":
            return { ...state, profilePicture: action.payload };

        default:
            return state;
    }
};