import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `https://jsonplaceholder.typicode.com/` }),
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
            }),
        }),

        // region Other Mutation
        //..
    }),
});


export const { useGetPostsQuery, useAddPostMutation } = apiSlice;

// region Post Type Definition
export interface Post {
    id: number;
    title: string;
    body: string;
    userId?: number;
}