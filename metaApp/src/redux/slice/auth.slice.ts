import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { axiosInstance } from '../../lib/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The Custom Base query for Axios Interceptor
 * @param param0
 * @returns
 */
const customBaseQuery = async ({ url, method, data }: any) => {
  try {
    const result = await axiosInstance({ url, method, data });
    return { data: result.data };

  } catch (error) {
    return { error };
  }
};

// Auth API
// region Auth API
export const authAPI = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // region Login Mutation
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        data: body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;
          dispatch(setCredentials({ accessToken, refreshToken, user }));

        } catch (error) {
          console.error('Login failed: ', error);
        }
      },
    }),

    // region Register Mutation
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        data: body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;

          dispatch(setCredentials({ accessToken, refreshToken, user }));
          Toast.show({
            type: 'success',
            text1: 'Registration Successful!',
          });

        } catch (error) {
          console.error('Registration failed: ', error);
          Toast.show({
            type: 'error',
            text1: 'Registration failed',
          });
        }
      },
    }),

    // region Logout Mutation
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          Toast.show({
            type: 'success',
            text1: 'Logout Successful!',
          });
        } catch (error) {
          console.error('Logout failed: ', error);
          Toast.show({
            type: 'error',
            text1: 'Logout failed',
          });
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authAPI;


// Auth State Interface
// region Auth Slice
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    firstname?: string;
    lastname?: string;
    email: string;
  } | null;
}

// Auth Initial State
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

// Auth-Slice..
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // region SetCredentials
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;

      // Setting to the AsyncStorage for Mobile Local-Storage
      AsyncStorage.setItem('accessToken', action.payload.accessToken);
      AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    // region ClearCrendential
    clearCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('user');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
