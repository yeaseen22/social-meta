import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "@/redux/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

// region Auth API Slice
export const authAPISlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.accessToken;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // region Get Posts Query
        getPosts: builder.query({
            query: () => 'posts',
        }),

        // region Add Posts Mutation
        addPost: builder.mutation({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body,
            })
        }),

        // region Login Mutation..
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            })
        }),

        // region Register Mutation..
        register: builder.mutation({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            })
        })
        //..
    }),
});


export const { useLoginMutation, useRegisterMutation } = authAPISlice;

// region Auth Slice
interface AuthState {
    accessToken: string | null;
    user: { id: string; firstname?: string; lastname?: string; email: string; } | null;
}

// regioon Auth Initial State
const initialState: AuthState = {
    accessToken: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // region Set Credentials
        setCredentials: (state, action) => {
            state.accessToken = action.payload.token;
            state.user = action.payload.user;
        },
        // region clear Credentials
        clearCredentials: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;