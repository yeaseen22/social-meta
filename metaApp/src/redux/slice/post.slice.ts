// src/redux/slice/post.ts

import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/shared/axios/axiosInstance';
import Toast from 'react-native-toast-message';


// Custom base query for Axios
const axiosBaseQuery = (): BaseQueryFn<
  { url: string; method: string; data?: any; params?: any },
  unknown,
  unknown
> => async ({ url, method, data, params }) => {
  try {
    const result = await axiosInstance({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as any;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        //region GET ALL POSTS
        getAllPosts: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/posts`,
                method: 'GET',
                params: { page, limit },
            }),
            providesTags: ['Posts'],
        }),

        // CREATE POST
        createPost: builder.mutation({
            query: (body) => ({
                url: `/posts`,
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['Posts'],
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    Toast.show({
                        type: 'success',
                        text1: 'Post Created',
                        text2: 'Your post was successfully published!',
                    });
                } catch (err: any) {
                    const message = err?.error?.data?.message || 'Failed to create post';
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: message,
                    });
                }
            },
        }),

        // DELETE POST
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useCreatePostMutation,
    useDeletePostMutation,
} = postAPI;


const postSlice = createSlice({
    name: 'post',
    initialState: {
        selectedPost: null,
    },
    reducers: {
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        clearSelectedPost: (state) => {
            state.selectedPost = null;
        },
    },
});

export const { setSelectedPost, clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;