import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { PostReducer } from './postReducer';
import { SettingsReducer } from './settingsReducer';
import { CommentReducer } from './commentReducer';

const rootReducer = combineReducers({
    User: UserReducer,
    Post: PostReducer,
    Settings: SettingsReducer,
    Comment: CommentReducer
});

export default rootReducer;
