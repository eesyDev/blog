import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const postApi = createApi({
    reducerPath: 'postApi',
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    baseQuery,
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => createRequest('/posts')
        }),
        getPostDetails: builder.query({
            query: (id) => createRequest(`/posts/${id}`)
        }),
        createPost: builder.mutation({
            query: (post) => createRequest('/posts', 'POST', post),     
        }),
        uploadImage: builder.mutation({
            query: (image) => createRequest('/upload', 'POST', image),     
        }),
    })
});

export const { useGetPostsQuery, useGetPostDetailsQuery, useCreatePostMutation, useUploadImageMutation } = postApi;