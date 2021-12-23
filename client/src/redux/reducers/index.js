import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { PostReducer } from './postReducer';

const rootReducer = combineReducers({
    User: UserReducer,
    Post: PostReducer
});

export default rootReducer;