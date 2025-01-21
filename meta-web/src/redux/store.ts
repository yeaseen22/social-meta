import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authAPISlice, authSliceReducer } from './slice';
// @ts-ignore
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Persistance Configurations
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authSliceReducer,
    [authAPISlice.reducerPath]: authAPISlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// region Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false // Disable for redux-perists for specific API-Slices
        }).concat(authAPISlice.middleware)
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;