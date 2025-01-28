import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import toaster from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

// region Auth API Slice
export const authAPISlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/auth`,
        // prepareHeaders: (headers, { getState }) => {
        //     const accessToken = (getState() as RootState).auth.accessToken;
        //     if (accessToken) {
        //         headers.set('Authorization', `Bearer ${accessToken}`);
        //     }
        //     return headers;
        // }
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
                url: '/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // Destructure response to extract token and user
                    const { accessToken, refreshToken, user } = data;
                    dispatch(setCredentials({ accessToken, refreshToken, user }));
                    toaster.success('Login successful!');

                } catch (error) {
                    console.error('Login failed: ', error);
                    toaster.error('Login failed. Please check your credentials.');
                }
            }
        }),

        // region Register Mutation..
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        toaster.success('Registration successful!');
                    }

                } catch (error) {
                    console.error('Registration failed: ', error);
                    toaster.error('Registration failed. Please check your credentials.');
                }
            }
        })
        //..
    }),
});

export const { useLoginMutation, useRegisterMutation } = authAPISlice;


// region Auth Slice
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; firstname?: string; lastname?: string; email: string; } | null;
}

// regioon Auth Initial State
const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // region Set Credentials
        setCredentials: (state, action) => {
            state.accessToken = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        },
        // region clear Credentials
        clearCredentials: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        }
    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;