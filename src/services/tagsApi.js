import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = url => ({ url })

export const tagsApi = createApi({
    reducerPath: 'tagsApi',
    // baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    baseQuery,
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => createRequest('/tags')
        })
    })
});

export const { useGetTagsQuery } = tagsApi;