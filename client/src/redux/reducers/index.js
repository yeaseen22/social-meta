import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';
import { PostReducer } from './postReducer';
import { SettingsReducer } from './settingsReducer';

const rootReducer = combineReducers({
    User: UserReducer,
    Post: PostReducer,
    Settings: SettingsReducer
});

export default rootReducer;
