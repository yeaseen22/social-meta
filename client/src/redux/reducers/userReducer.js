// Users Reducer..
export function UserReducer(state = {}, action) {
    switch (action.type) {
        case "ALL_USERS":
            return { ...state, allUsers: action.payload };

        case "OWN_PROFILE_INFO":
            return { ...state, ownProfileInfo: action.payload };

        case "USER_BY_ID":
            return { ...state, userInfoById: action.payload };

        case "USER_AUTH":
            return { ...state, login: action.payload };

        case "USER_LOGOUT":
            return { ...state, logout: action.payload };

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
}
